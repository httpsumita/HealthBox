import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateText";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method Not Allowed" });

  const { query } = req.body;
  if (!query) return res.status(400).json({ error: "Query is required" });

  try {
    const response = await axios.post(
      `${GEMINI_API_URL}?key=${GEMINI_API_KEY}`,
      { prompt: `User symptoms: ${query}. Provide medicine, diet, precautions, and extra details.` }
    );

    res.status(200).json({ reply: response.data.candidates[0].text });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch response" });
  }
}
