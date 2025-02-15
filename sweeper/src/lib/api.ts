import { getApiKey } from './cookies';

const OPENROUTER_API_URL = 'https://openrouter.ai/api/v1/chat/completions';

interface Message {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export interface ConceptsResponse {
  relatedConcepts: string[];
  confusingConcepts: string[];
}

interface OpenRouterResponse {
  id: string;
  choices: Array<{
    message: {
      content: string;
    };
  }>;
}

// 随机打乱数组
function shuffleArray<T>(array: T[]): T[] {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

// 字符串标准化函数
function normalizeString(str: string): string {
  return str
    .trim()
    .toLowerCase()
    .normalize('NFKC')  // 标准化 Unicode 字符
    .replace(/\s+/g, ' ');  // 将多个空格替换为单个空格
}

// 验证概念数据的格式和内容
function validateConceptsData(data: any): data is ConceptsResponse {
  if (!data || typeof data !== 'object') return false;
  
  // 验证数组存在性和类型
  if (!Array.isArray(data.relatedConcepts) || !Array.isArray(data.confusingConcepts)) {
    return false;
  }
  
  // 验证数组元素类型
  if (!data.relatedConcepts.every((item: any) => typeof item === 'string') ||
      !data.confusingConcepts.every((item: any) => typeof item === 'string')) {
    return false;
  }
  
  // 验证数组元素有效性（去除空字符串和纯空白字符）
  data.relatedConcepts = data.relatedConcepts
    .map(item => item.trim())
    .filter(item => item.length > 0);
  data.confusingConcepts = data.confusingConcepts
    .map(item => item.trim())
    .filter(item => item.length > 0);
  
  return true;
}

// 清理和解析JSON内容
function parseJsonContent(content: string): ConceptsResponse {
  // 移除可能的Markdown代码块标记
  let jsonString = content
    .replace(/^```json\n/, '')
    .replace(/^```\n/, '')
    .replace(/\n```$/, '')
    .trim();

  try {
    // 尝试直接解析
    const parsed = JSON.parse(jsonString);
    
    // 在验证之前先进行单次响应内的去重
    if (parsed && typeof parsed === 'object') {
      // 使用 Map 在保留原始大小写的同时去重
      const deduplicateArray = (arr: string[]): string[] => {
        const normalizedMap = new Map<string, string>();
        
        if (Array.isArray(arr)) {
          arr.forEach(item => {
            if (typeof item === 'string') {
              const normalized = normalizeString(item);
              if (!normalizedMap.has(normalized)) {
                normalizedMap.set(normalized, item.trim());
              }
            }
          });
        }
        
        return Array.from(normalizedMap.values());
      };

      // 对两个数组分别去重
      if (Array.isArray(parsed.relatedConcepts)) {
        parsed.relatedConcepts = deduplicateArray(parsed.relatedConcepts);
      }
      if (Array.isArray(parsed.confusingConcepts)) {
        parsed.confusingConcepts = deduplicateArray(parsed.confusingConcepts);
      }
    }

    if (validateConceptsData(parsed)) {
      return parsed;
    }
    throw new Error('Invalid data structure');
  } catch (firstError) {
    // 如果直接解析失败，尝试提取JSON对象
    try {
      const match = content.match(/({[\s\S]*})/);
      if (!match) throw new Error('No JSON object found in content');
      
      const extracted = JSON.parse(match[1]);
      
      // 对提取的JSON也进行同样的去重处理
      if (extracted && typeof extracted === 'object') {
        const deduplicateArray = (arr: string[]): string[] => {
          const normalizedMap = new Map<string, string>();
          
          if (Array.isArray(arr)) {
            arr.forEach(item => {
              if (typeof item === 'string') {
                const normalized = normalizeString(item);
                if (!normalizedMap.has(normalized)) {
                  normalizedMap.set(normalized, item.trim());
                }
              }
            });
          }
          
          return Array.from(normalizedMap.values());
        };

        if (Array.isArray(extracted.relatedConcepts)) {
          extracted.relatedConcepts = deduplicateArray(extracted.relatedConcepts);
        }
        if (Array.isArray(extracted.confusingConcepts)) {
          extracted.confusingConcepts = deduplicateArray(extracted.confusingConcepts);
        }
      }
      
      if (validateConceptsData(extracted)) {
        return extracted;
      }
      throw new Error('Invalid data structure after extraction');
    } catch (secondError) {
      throw new Error(`Failed to parse response: ${secondError.message}`);
    }
  }
}

export async function generateConcepts(theme: string, language: string = 'zh'): Promise<ConceptsResponse> {
  const apiKey = getApiKey();
  if (!apiKey) {
    throw new Error('API key not found');
  }

  // 使用 Map 来存储标准化的字符串到原始字符串的映射
  const normalizedRelated = new Map<string, string>();
  const normalizedConfusing = new Map<string, string>();
  let attempts = 0;
  const maxAttempts = 3;
  let lastError: Error | null = null;
  let previousResults: ConceptsResponse | null = null;

  while ((normalizedRelated.size < 90 || normalizedConfusing.size < 10) && attempts < maxAttempts) {
    attempts++;
    console.log(`Attempt ${attempts}: Generating characters...`);

    // 构建已生成概念的提示
    let previousResultsPrompt = '';
    if (previousResults) {
      previousResultsPrompt = `
      上一次生成的结果：
      相关人名：${previousResults.relatedConcepts.join('、')}
      混淆人名：${previousResults.confusingConcepts.join('、')}
      
      请注意：
      1. 不要重复上述任何人名
      2. 生成与上述完全不同的新人名
      3. 保持同样的主题相关性要求
      `;
    }

    const messages: Message[] = [
      {
        role: 'system',
        content: `您是一个专门生成人名列表的助手。需要生成两种类型的人名：
        1. 相关人名（至少120个）：与主题完全匹配的准确人名
           - 包含该主题领域的真实人物
           - 必须是真实存在的历史人物
        2. 混淆人名（至少30个）：看似相关实则无关的迷惑项
           - 不符合主题的真实人物
           - 必须是真实存在的历史人物
  
        规则：
        - 使用${language}语言生成
        - 必须是人名而不是职位
        - 确保相关人名100%符合主题
        - 混淆项要选择同时期或相近时期的人物，以增加迷惑性
        - 严格避免重复和过度相似项
        - 选择范围包含中外所有人物，混淆项优先考虑与主题相同的国家/时期的人物
        - 返回严格符合JSON格式
        
        注意：这是第${attempts}次尝试，请生成与之前完全不同的新结果。${previousResultsPrompt}`
      },
      {
        role: 'user',
        content: `生成人名列表，主题："${theme}"。
        
        请特别注意：
        1. 相关人名必须精准匹配主题，必须是真实历史人物
        2. 混淆项必须是同时期或相近时期的真实人物，增加迷惑性
        3. 包含中外人物，但混淆项优先使用同地区/时期的人物
        4. 生成数量要超出需求以备筛选
        5. 确保与之前生成的结果完全不同
        
        返回严格JSON格式：
        {
          "relatedConcepts": ["人名1", "人名2", ...], // 至少120项
          "confusingConcepts": ["混淆人名1", ...] // 至少30项
        }`
      }
    ];

    try {
      const response = await fetch(OPENROUTER_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
          'HTTP-Referer': 'https://github.com/YYMinesweeper',
          'X-Title': 'Theme Minesweeper'
        },
        body: JSON.stringify({
          model: 'anthropic/claude-3-sonnet',
          messages,
          response_format: { type: "json_object" },
          temperature: 0.8 + (attempts * 0.1) // 增加随机性以获取更多不同的结果
        })
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: { message: response.statusText } }));
        throw new Error(errorData.error?.message || `API request failed: ${response.statusText}`);
      }

      const data: OpenRouterResponse = await response.json();
      
      if (!data?.choices?.[0]?.message?.content) {
        throw new Error('Invalid API response structure: missing content');
      }

      let content = data.choices[0].message.content;
      let concepts: ConceptsResponse;

      if (typeof content === 'object') {
        concepts = content as ConceptsResponse;
      } else {
        concepts = parseJsonContent(content);
      }
      
      // 保存当前结果用于下次请求
      previousResults = {
        relatedConcepts: [...concepts.relatedConcepts],
        confusingConcepts: [...concepts.confusingConcepts]
      };

      // Validate the parsed concepts
      if (!validateConceptsData(concepts)) {
        throw new Error('Invalid concepts data structure');
      }

      // 数据清理和规范化
      const processNewConcepts = (
        items: string[],
        targetMap: Map<string, string>,
        otherMap: Map<string, string>
      ) => {
        items.forEach(item => {
          const trimmed = item.trim();
          if (trimmed.length === 0) return;
          
          const normalized = normalizeString(trimmed);
          // 检查是否已存在于目标Map或另一个Map中
          if (!targetMap.has(normalized) && !otherMap.has(normalized)) {
            targetMap.set(normalized, trimmed);
          }
        });
      };

      // 处理新的概念
      processNewConcepts(concepts.relatedConcepts, normalizedRelated, normalizedConfusing);
      processNewConcepts(concepts.confusingConcepts, normalizedConfusing, normalizedRelated);

      console.log(`After attempt ${attempts}:`);
      console.log(`Related characters: ${normalizedRelated.size}`);
      console.log(`Confusing characters: ${normalizedConfusing.size}`);

    } catch (error) {
      console.error(`Error in attempt ${attempts}:`, error);
      lastError = error instanceof Error ? error : new Error(String(error));
      if (attempts === maxAttempts) {
        throw new Error(`Failed after ${maxAttempts} attempts. Last error: ${lastError.message}`);
      }
      continue;
    }

    if (normalizedRelated.size >= 90 && normalizedConfusing.size >= 10) {
      // 将Map的值转换为数组并随机打乱
      return {
        relatedConcepts: shuffleArray(Array.from(normalizedRelated.values())),
        confusingConcepts: shuffleArray(Array.from(normalizedConfusing.values()))
      };
    }
  }

  // 如果循环结束后仍未获得足够的概念
  throw new Error(
    `Failed to generate enough characters after ${maxAttempts} attempts. ` +
    `Got ${normalizedRelated.size} related and ${normalizedConfusing.size} confusing characters. ` +
    (lastError ? `Last error: ${lastError.message}` : '')
  );
} 