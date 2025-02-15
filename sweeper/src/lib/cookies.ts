import Cookies from 'js-cookie';

const OPENROUTER_API_KEY = 'openrouter_api_key';

export const getApiKey = () => {
  return Cookies.get(OPENROUTER_API_KEY);
};

export const setApiKey = (apiKey: string) => {
  Cookies.set(OPENROUTER_API_KEY, apiKey, { expires: 30 }); // expires in 30 days
};

export const removeApiKey = () => {
  Cookies.remove(OPENROUTER_API_KEY);
}; 