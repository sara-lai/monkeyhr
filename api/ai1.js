// citation: created with guidance from GPT & https://vercel.com/docs/ai/openai?package-manager=npm

import { openai } from '@ai-sdk/openai'
import { generateText } from 'ai'

export default async function handler(req, res) {
  try {

    const { commitMessages } = req.body

    const prompt = `
      Analyze the following commit messages for overly literal content (e.g., as if an AI generated it).
      Commit messages: ${JSON.stringify(commitMessages)}.
      Return a JSON object with:
      - "flag": "red" (highly literal, problematic, lacks any thought other than just stating what did literally ), "green" (moderately literal, or commenting at a higher level eg features, demonstrates some sort of thought process, possibly shows greater context for app).
      - "summary": A one-sentence summary of the nature of the commit messages.
    `

    const { text } = await generateText({
      model: openai('gpt-3.5-turbo'),
      messages: [{ role: 'user', content: prompt }],
      maxTokens: 50,
    })

    const result = JSON.parse(text)

    res.status(200).json({
      flag: result.flag,
      summary: result.summary
    })  

  } catch (error) {
    console.error('ChatGPT Error:', error)
    res.status(500).json({ error: 'Something went wrong' })
  }
}








