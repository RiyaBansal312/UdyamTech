import React, { useState, useEffect } from "react";
import { uploadInvoice, getFilings } from "../api";
import { Form, Button, Card } from "react-bootstrap";

export default function GSTFiling() {
  const [file, setFile] = useState(null);
  const [filings, setFilings] = useState([]);

  useEffect(() => {
    getFilings().then(res => setFilings(res.data));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return;
    const formData = new FormData();
    formData.append("invoice", file);
    await uploadInvoice(formData);
    getFilings().then(res => setFilings(res.data));
  };

  return (
    <div>
      <h2>🧾 GST Filing Assistant</h2>
      <Form onSubmit={handleSubmit} className="mb-4">
        <Form.Group className="mb-2">
          <Form.Control type="file" onChange={(e) => setFile(e.target.files[0])} required />
        </Form.Group>
        <Button variant="success" type="submit">Upload Invoice</Button>
      </Form>

      {filings.map(f => (
        <Card className="mb-3" key={f._id}>
          <Card.Body>
            <Card.Title>{f.businessName}</Card.Title>
            <Card.Text><pre>{JSON.stringify(f.invoiceData, null, 2)}</pre></Card.Text>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
}
