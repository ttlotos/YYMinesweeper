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

export async function generateConcepts(theme: string, language: string = 'zh'): Promise<ConceptsResponse> {
  const apiKey = getApiKey();
  if (!apiKey) {
    throw new Error('API key not found');
  }

  const messages: Message[] = [
    {
      role: 'system',
      content: `You are a helpful assistant that generates concepts related to a given theme.
      You should generate two types of concepts:
      1. Related concepts (at least 150 items): Concepts that are clearly and strongly associated with the theme.
         - Include core concepts directly related to the theme
         - Include sub-concepts and variations
         - Include related tools, methods, and techniques
         - Include common applications and use cases
         - Include historical and modern examples
         - Include theoretical and practical aspects
      
      2. Confusing concepts (at least 30 items): Concepts that might be easily confused with or mistakenly associated with the theme.
         - Include concepts that sound similar but are different
         - Include concepts from related but different fields
         - Include common misconceptions
         - Include concepts that share partial overlap but are distinct
      
      Rules:
      - Generate all concepts in ${language} language
      - Each concept should be clear and concise (2-6 words)
      - Avoid duplicates or very similar concepts
      - For confusing concepts, they should be plausible but incorrect associations
      - Return response in exact JSON format as specified
      - Ensure all concepts are appropriate for a game context
      - Each concept should be unique and meaningful
      - Use diverse categories and aspects of the theme
      - Include both common and specialized concepts
      - Consider different difficulty levels
      - Ensure concepts are factually correct
      `
    },
    {
      role: 'user',
      content: `Generate a comprehensive list of concepts for the theme: "${theme}".
      Think broadly and deeply about the theme, considering all possible aspects and relationships.
      
      Return ONLY a JSON object in this exact format, with no additional text:
      {
        "relatedConcepts": ["concept1", "concept2", ...], // at least 150 items
        "confusingConcepts": ["concept1", "concept2", ...] // at least 30 items
      }
      
      Remember:
      1. Generate MORE concepts than needed to ensure we have enough unique and high-quality options
      2. Cover different aspects and categories of the theme
      3. Include both basic and advanced concepts
      4. Ensure concepts are clear and well-defined
      5. Avoid repetition and maintain diversity`
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
        temperature: 0.8
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error?.message || `API request failed: ${response.statusText}`);
    }

    const data: OpenRouterResponse = await response.json();
    
    if (!data.choices?.[0]?.message?.content) {
      console.error('Unexpected API response structure:', data);
      throw new Error('Invalid API response structure');
    }

    let concepts: ConceptsResponse;
    const content = data.choices[0].message.content;

    try {
      concepts = JSON.parse(content);
    } catch (parseError) {
      console.error('Failed to parse response content:', content);
      console.error('Parse error:', parseError);
      throw new Error('Invalid JSON format in API response');
    }

    // 验证数组格式
    if (!Array.isArray(concepts.relatedConcepts) || 
        !Array.isArray(concepts.confusingConcepts)) {
      console.error('Invalid concepts structure:', concepts);
      throw new Error('Invalid response format: arrays not found');
    }

    // 验证最小数量
    if (concepts.relatedConcepts.length < 90) {
      console.error(`Not enough related concepts: got ${concepts.relatedConcepts.length}, need at least 90`);
      throw new Error('Not enough related concepts generated');
    }

    if (concepts.confusingConcepts.length < 10) {
      console.error(`Not enough confusing concepts: got ${concepts.confusingConcepts.length}, need at least 10`);
      throw new Error('Not enough confusing concepts generated');
    }

    return concepts;
  } catch (error) {
    console.error('Error generating concepts:', error);
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('Unknown error occurred while generating concepts');
  }
} 