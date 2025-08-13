import mongoose from "mongoose";

const gstSchema = new mongoose.Schema({
  businessName: String,
  invoiceData: Object,
  date: { type: Date, default: Date.now }
});

export default mongoose.model("GSTFiling", gstSchema);
