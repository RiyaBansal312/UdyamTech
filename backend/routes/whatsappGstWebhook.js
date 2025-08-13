import express from "express";
import axios from "axios";
import fs from "fs";
import path from "path";
import { extractTextFromImage } from "../utils/ocr.js";
import { parseInvoiceAI } from "../utils/aiParser.js";
import GSTFiling from "../models/GSTFiling.js";
import { sendWhatsAppMessage } from "../utils/twilioClient.js";

const router = express.Router();

router.post("/webhook", express.urlencoded({ extended: true }), async (req, res) => {
  try {
    const from = req.body.From.replace("whatsapp:", "");
    const numMedia = parseInt(req.body.NumMedia || "0");

    if (numMedia === 0) {
      await sendWhatsAppMessage(from, "📄 Please send an invoice image for GST filing.");
      return res.sendStatus(200);
    }

    const mediaUrl = req.body.MediaUrl0;
    const contentType = req.body.MediaContentType0;
    const ext = contentType.split("/")[1];
    const localPath = path.join("uploads", `invoice_${Date.now()}.${ext}`);

    const mediaRes = await axios.get(mediaUrl, {
      responseType: "arraybuffer",
      headers: {
        Authorization: `Basic ${Buffer.from(
          process.env.TWILIO_ACCOUNT_SID + ":" + process.env.TWILIO_AUTH_TOKEN
        ).toString("base64")}`
      }
    });

    fs.writeFileSync(localPath, mediaRes.data);

    // Step 1: OCR
    const extractedText = await extractTextFromImage(localPath);
    console.log("📝 OCR Extracted:\n", extractedText);

    // Step 2: AI Parsing
    const parsedData = await parseInvoiceAI(extractedText);
    console.log("🤖 AI Parsed Data:", parsedData);

    // Step 3: Save to DB
    const filing = new GSTFiling({
      businessName: "Demo Business",
      invoiceData: parsedData
    });
    await filing.save();

    // Step 4: Send confirmation
    const confirmation = `✅ GST filing record created.
Invoice: ${parsedData.invoiceNumber || "N/A"}
Date: ${parsedData.invoiceDate || "N/A"}
GST Amount: ₹${parsedData.gstAmount || "N/A"}
Taxable Value: ₹${parsedData.taxableValue || "N/A"}`;
    await sendWhatsAppMessage(from, confirmation);

    res.sendStatus(200);
  } catch (err) {
    console.error("❌ GST WhatsApp webhook error:", err);
    res.sendStatus(500);
  }
});

export default router;
