import React, { useState, useEffect } from "react";
import { getPolicies, addPolicy } from "../api";
import { Form, Button, Card } from "react-bootstrap";

export default function PolicyUpdates() {
  const [policies, setPolicies] = useState([]);
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [phone, setPhone] = useState("");

  useEffect(() => {
    getPolicies().then(res => setPolicies(res.data));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addPolicy({ title, summary, phone });
    setTitle(""); setSummary(""); setPhone("");
    getPolicies().then(res => setPolicies(res.data));
  };

  return (
    <div>
      <h2>📢 Policy Updates</h2>
      <Form onSubmit={handleSubmit} className="mb-4">
        <Form.Group className="mb-2">
          <Form.Control value={title} onChange={e => setTitle(e.target.value)} placeholder="Policy Title" required />
        </Form.Group>
        <Form.Group className="mb-2">
          <Form.Control as="textarea" rows={3} value={summary} onChange={e => setSummary(e.target.value)} placeholder="Policy Summary" required />
        </Form.Group>
        <Form.Group className="mb-2">
          <Form.Control value={phone} onChange={e => setPhone(e.target.value)} placeholder="Phone (+91...)" />
        </Form.Group>
        <Button variant="primary" type="submit">Add Policy</Button>
      </Form>

      {policies.map(p => (
        <Card className="mb-3" key={p._id}>
          <Card.Body>
            <Card.Title>{p.title}</Card.Title>
            <Card.Text>{p.summary}</Card.Text>
            <small className="text-muted">{new Date(p.date).toLocaleString()}</small>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
}
