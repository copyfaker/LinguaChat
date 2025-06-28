import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function handler(req, res) {
  const { text, targetLang, context } = req.body;

  const response = await openai.createChatCompletion({
    model: "gpt-4o",
    messages: [
      { role: "system", content: `You are a translator that adapts messages for cultural and linguistic accuracy. Target language: ${targetLang}. Context: ${context}` },
      { role: "user", content: text },
    ],
  });

  res.status(200).json({ translated: response.data.choices[0].message.content });
}
