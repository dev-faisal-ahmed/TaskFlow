'use server';

import { API_KEY } from '@/lib/config';
import { GoogleGenerativeAI } from '@google/generative-ai';

export async function getAIDescription(title: string) {
  const googleAI = new GoogleGenerativeAI(API_KEY!);
  const model = googleAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

  const message = `Hi I am making an to do list, Please generate me a short to do description with in two lines by the given title which ${title} Please send me the description only do not send anything else just send me the actual description`;

  try {
    const result = await model.generateContent([message]);
    return result.response.text();
  } catch (error) {
    return '';
  }
}
