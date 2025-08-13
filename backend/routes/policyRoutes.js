import express from "express";
import Policy from "../models/Policy.js";
import { sendWhatsAppMessage } from "../utils/twilioClient.js";


const router = express.Router();

router.get("/", async (req, res) => {
  const policies = await Policy.find().sort({ date: -1 });
  res.json(policies);
});

router.post("/", async (req, res) => {
  const { title, summary, phone } = req.body;
  const policy = new Policy({ title, summary });
  await policy.save();

  if (phone) {
    await sendWhatsAppMessage(phone, `📢 New Policy: ${title}\n${summary}`);
  }

  res.json({ message: "Policy Added & Notification Sent" });
});

export default router;
