import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, Button, Form, Badge } from "react-bootstrap";

export default function SupplierRisk() {
  const [suppliers, setSuppliers] = useState([]);
  const [formData, setFormData] = useState({ name: "", gstNumber: "" });

  useEffect(() => {
    fetchSuppliers();
  }, []);

  const fetchSuppliers = async () => {
    const res = await axios.get("http://localhost:5000/api/suppliers");
    setSuppliers(res.data);
  };

  const addSupplier = async () => {
    if (!formData.name || !formData.gstNumber) return;
    await axios.post("http://localhost:5000/api/suppliers", formData);
    setFormData({ name: "", gstNumber: "" });
    fetchSuppliers();
  };

  const randomRisk = async (id) => {
    const riskScore = Math.floor(Math.random() * 101);
    const issues = riskScore > 40 ? ["Random compliance issue"] : [];
    await axios.put(`http://localhost:5000/api/suppliers/${id}/risk`, {
      riskScore,
      issuesFound: issues,
    });
    fetchSuppliers();
  };

  const getBadge = (status) => {
    if (status === "OK") return <Badge bg="success">OK</Badge>;
    if (status === "Warning") return <Badge bg="warning">Warning</Badge>;
    if (status === "High Risk") return <Badge bg="danger">High Risk</Badge>;
  };

  return (
    <div className="container mt-4">
      <h3>Supplier Risk Tracker</h3>

      {/* Add Supplier Form */}
      <div className="d-flex mb-3">
        <Form.Control
          placeholder="Supplier Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="me-2"
        />
        <Form.Control
          placeholder="GST Number"
          value={formData.gstNumber}
          onChange={(e) =>
            setFormData({ ...formData, gstNumber: e.target.value })
          }
          className="me-2"
        />
        <Button onClick={addSupplier}>Add Supplier</Button>
      </div>

      {/* Suppliers Table */}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>GST Number</th>
            <th>Risk Score</th>
            <th>Status</th>
            <th>Issues</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {suppliers.map((s) => (
            <tr key={s._id}>
              <td>{s.name}</td>
              <td>{s.gstNumber}</td>
              <td>{s.riskScore}</td>
              <td>{getBadge(s.complianceStatus)}</td>
              <td>{s.issuesFound.join(", ") || "None"}</td>
              <td>
                <Button
                  variant="info"
                  size="sm"
                  onClick={() => randomRisk(s._id)}
                >
                  Recheck Risk
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}
