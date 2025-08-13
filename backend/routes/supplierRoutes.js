import express from "express";
import {
  getSuppliers,
  addSupplier,
  updateSupplierRisk,
} from "../controllers/supplierController.js"; // ✅ Make sure this file exists

const router = express.Router();

// GET all suppliers
router.get("/", getSuppliers);

// POST new supplier
router.post("/", addSupplier);

// PUT update supplier risk
router.put("/:id/risk", updateSupplierRisk);

export default router;
