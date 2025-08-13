import express from "express";
import multer from "multer";
import { extractTextFromImage } from "../utils/ocr.js";
import GSTFiling from "../models/GSTFiling.js";

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.post("/upload", upload.single("invoice"), async (req, res) => {
  const text = await extractTextFromImage(req.file.path);
  const filing = new GSTFiling({ businessName: "Demo Business", invoiceData: { raw: text } });
  await filing.save();
  res.json({ message: "GST Filing Created", extractedText: text });
});

router.get("/", async (req, res) => {
  const filings = await GSTFiling.find().sort({ date: -1 });
  res.json(filings);
});

export default router;
