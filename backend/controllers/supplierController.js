// backend/controllers/supplierController.js
import Supplier from "../models/Supplier.js";

import dotenv from "dotenv";
import { sendSMS } from "../utils/twilioClient.js";

dotenv.config();

// 📌 Get all suppliers
export const getSuppliers = async (req, res) => {
  try {
    const suppliers = await Supplier.find().sort({ lastChecked: -1 });
    res.json(suppliers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 📌 Add a new supplier + send WhatsApp alert
export const addSupplier = async (req, res) => {
  try {
    const supplier = new Supplier(req.body);
    await supplier.save();

    await sendSMS(
      process.env.ALERT_PHONE_NUMBER,
      `📢 New Supplier Added: ${supplier.name} (GST: ${supplier.gstNumber})`
    );

    res.status(201).json(supplier);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// 📌 Update supplier risk + send WhatsApp alert if risky
export const updateSupplierRisk = async (req, res) => {
  try {
    const { id } = req.params;
    const { riskScore, issuesFound } = req.body;

    let complianceStatus = "OK";
    if (riskScore > 70) complianceStatus = "High Risk";
    else if (riskScore > 40) complianceStatus = "Warning";

    const supplier = await Supplier.findByIdAndUpdate(
      id,
      {
        riskScore,
        complianceStatus,
        issuesFound,
        lastChecked: Date.now(),
      },
      { new: true }
    );

    if (complianceStatus !== "OK") {
      await sendSMS(
        process.env.ALERT_PHONE_NUMBER,
        `⚠️ Supplier Alert: ${supplier.name} is now "${complianceStatus}" (Risk: ${riskScore})`
      );
    }

    res.json(supplier);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
