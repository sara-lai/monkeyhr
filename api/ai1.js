// citation: created with guidance from GPT & https://vercel.com/docs/ai/openai?package-manager=npm

import { openai } from '@ai-sdk/openai';
import { generateText } from 'ai';

export default async function handler(req, res) {
  try {
    // Simple "Hello World" prompt for ChatGPT
    const { text } = await generateText({
      model: openai('gpt-3.5-turbo'),
      messages: [{ role: 'user', content: 'Say Hello World!' }],
      maxTokens: 50,
    });

    res.status(200).json({ message: text });
  } catch (error) {
    console.error('ChatGPT Error:', error);
    res.status(500).json({ error: 'Something went wrong' });
  }
}