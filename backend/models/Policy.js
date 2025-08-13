import mongoose from "mongoose";

const policySchema = new mongoose.Schema({
  title: String,
  summary: String,
  date: { type: Date, default: Date.now }
});

export default mongoose.model("Policy", policySchema);
