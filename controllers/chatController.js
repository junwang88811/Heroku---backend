import axios from 'axios';
import { generateText } from "ai"
import { togetherai } from "@ai-sdk/togetherai"
import Chat from '../models/Chat.js';

export const sendMessage = async (req, res) => {
  const { message } = req.body;
  const userId = req.user.id

  if (!message) {
    return res.status(400).json({ error: "Message is required" })
  }

  if (!message) {
    return res.status(400).json({ error: "Message is required" });
  }

  try {
    const result = await generateText({
      model: togetherai("meta-llama/Llama-3.3-70B-Instruct-Turbo-Free"),
      //  prompt: message,
      messages: [
        {
          role: "system",
          content: "You are an AI chatbot for a food restaurant. You provide menu recommendations, recipes, and help with orders. Focus on Italian and Chinese dishes. Just give a good short answer to users"
        },
        {
          role: "user",
          content: message
        }
      ],
       
      maxTokens: 1000,
      temperature: 0.7,
    })

    await Chat.findOneAndUpdate(
      { userId },
      {
        $push: {
          messages: [
            { role: "user", content: message },
            { role: "assistant", content: result.text },
          ],
        },
      },
      { upsert: true, new: true },
    )

    res.json({ reply: result });
  } catch (error) {
    console.error("DeepSeek API Error:", error.response?.status, error.response?.data || error.message);

    if (error.response?.status === 401) {
      return res.status(401).json({ error: "Authentication failed. Please check your API key." });
    }

    res.status(500).json({ error: "Failed to fetch response from DeepSeek API" });
  }
};

export const getChatHistory = async (req, res) => {
  const userId = req.user.id // Assuming you have user authentication middleware

  try {
    const chat = await Chat.findOne({ userId })
    res.json(chat ? chat.messages : [])
  } catch (error) {
    console.error("Error fetching chat history:", error)
    res.status(500).json({ error: "Failed to fetch chat history" })
  }
}

