"use server";

import Query from "@/models/query";
import db from "@/utils/db";

const {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} = require("@google/generative-ai");

const apiKey = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash-exp",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

export async function runAi(text: string) {
  const chatSession = model.startChat({
    generationConfig,
    history: [],
  });

  const result = await chatSession.sendMessage(text);
  return result.response.text();
}

export async function saveQuery(
  template: Object,
  email: string,
  query: string,
  content: string
) {
  try {
    await db();

    const newQuery = new Query({
      template,
      email,
      query,
      content,
    });

    await newQuery.save();

    return {
      ok: true,
    };
  } catch (err) {
    return {
      ok: false,
    };
  }
}

export async function getQueries(email: string, page: number, perPage: number) {
  try {
    await db();

    const skip = (page - 1) * perPage;
    const totalQueries = await Query.countDocuments({ email });
    const queries = await Query.find({ email })
      .skip(skip)
      .limit(perPage)
      .sort({ createdAt: -1 });

    return JSON.parse(
      JSON.stringify({
        queries,
        totalPages: Math.ceil(totalQueries / perPage),
      })
    );
  } catch (err) {
    return {
      ok: false,
    };
  }
}
