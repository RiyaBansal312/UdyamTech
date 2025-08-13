import OpenAI from "openai";
import dotenv from "dotenv";
dotenv.config();

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function parseInvoiceAI(ocrText) {
  const prompt = `Extract the following fields from this GST invoice text:
  - Invoice Number
  - Invoice Date
  - GST Amount
  - Taxable Value

If a value is missing, return null.  
Return only JSON in this format:
{"invoiceNumber": "...", "invoiceDate": "...", "gstAmount": "...", "taxableValue": "..."}

Invoice text:
${ocrText}`;

  try {
    const res = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      temperature: 0
    });

    let content = res.choices[0].message.content.trim();

    // Remove Markdown code fences if present
    content = content.replace(/```json/i, "").replace(/```/g, "").trim();

    return JSON.parse(content);
  } catch (err) {
    console.error("AI Parsing Error:", err);
    return { invoiceNumber: null, invoiceDate: null, gstAmount: null, taxableValue: null };
  }
}
