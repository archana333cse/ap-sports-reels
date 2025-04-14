import OpenAI from 'openai';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! });

export async function generateScript(name: string): Promise<string> {
  const res = await openai.chat.completions.create({
    model: 'gpt-4',
    messages: [
      { role: 'user', content: `Write a 30-second video script about the sports career of ${name}.` }
    ],
  });

  return res.choices[0].message.content ?? '';
}
