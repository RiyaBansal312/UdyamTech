// backend/seedSuppliers.js
import mongoose from "mongoose";
import dotenv from "dotenv";
import Supplier from "./models/supplier.model.js";

dotenv.config();

const fakeSuppliers = [
  {
    name: "ABC Textiles Pvt Ltd",
    gstNumber: "27ABCDE1234F1Z5",
    riskScore: 20,
    complianceStatus: "OK",
    issuesFound: [],
  },
  {
    name: "XYZ Electronics",
    gstNumber: "29XYZDE5678G1Z7",
    riskScore: 55,
    complianceStatus: "Warning",
    issuesFound: ["Late GST Filing in last quarter"],
  },
  {
    name: "Global Trade Co.",
    gstNumber: "07GLOBCO3456H1Z3",
    riskScore: 85,
    complianceStatus: "High Risk",
    issuesFound: ["Multiple GST defaults", "Pending legal notice"],
  },
];

mongoose
  .connect(process.env.MONGO_URI)
  .then(async () => {
    await Supplier.deleteMany({});
    await Supplier.insertMany(fakeSuppliers);
    console.log("✅ Suppliers seeded");
    mongoose.connection.close();
  })
  .catch((err) => console.error(err));
