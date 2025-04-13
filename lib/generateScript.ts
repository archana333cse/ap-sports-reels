// lib/generateScript.ts
import OpenAI from 'openai';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! });

export async function generateScript(athleteName: string): Promise<string> {
  const prompt = `Write a short 30-second video script about the history and career highlights of ${athleteName}.`;

  const response = await openai.chat.completions.create({
    model: 'gpt-4',
    messages: [{ role: 'user', content: prompt }],
  });

  return response.choices[0].message.content || '';
}
