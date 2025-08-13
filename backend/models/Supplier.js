// backend/models/supplier.model.js
import mongoose from "mongoose";

const supplierSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  gstNumber: { type: String, required: true, unique: true, trim: true },
  complianceStatus: {
  type: String,
  enum: ["OK", "Warning", "High Risk", "FLAGGED"],
  default: "OK"
}
,
  riskScore: { type: Number, min: 0, max: 100, default: 0 },
  issuesFound: { type: [String], default: [] },
  lastChecked: { type: Date, default: Date.now },
});

export default mongoose.model("Supplier", supplierSchema);
