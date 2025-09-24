import fetch from "node-fetch";

export async function queryGPT(text) {
  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.OPENAI_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "You are an empathetic mental health assistant." },
        { role: "user", content: `Analyze this journal entry and return JSON with keys: summary (string), insights (array of 3 suggestions). Entry: "${text}"` }
      ],
      max_tokens: 300
    })
  });

  const data = await response.json();
  try {
    return JSON.parse(data.choices[0].message.content);
  } catch {
    return { summary: data.choices[0].message.content, insights: [] };
  }
}
