// import React, { useState } from "react";
// import PolicyUpdates from "./PolicyUpdates";
// import GSTFiling from "./GSTFiling";
// import SupplierRisk from "./SupplierRisk";
// import { Container, Nav, Navbar } from "react-bootstrap";

// export default function SMEDashboard() {
//   const [tab, setTab] = useState("policies");

//   return (
//     <>
//       <Navbar bg="dark" variant="dark" expand="lg">
//         <Container>
//           <Navbar.Brand>📊 SME Dashboard</Navbar.Brand>
//           <Nav className="me-auto">
//             <Nav.Link onClick={() => setTab("policies")}>Policy Updates</Nav.Link>
//             <Nav.Link onClick={() => setTab("gst")}>GST Filing</Nav.Link>
//             <Nav.Link onClick={() => setTab("suppliers")}>Supplier Risk</Nav.Link>
//           </Nav>
//         </Container>
//       </Navbar>

//       <Container className="mt-4">
//         {tab === "policies" && <PolicyUpdates />}
//         {tab === "gst" && <GSTFiling />}
//         {tab === "suppliers" && <SupplierRisk />}
//       </Container>
//     </>
//   );
// }



//by riya


import React, { useState } from "react";
import { Tabs, Tab, Container } from "react-bootstrap";
import PolicyUpdates from "./PolicyUpdates";
import GSTFiling from "./GSTFiling";
import SupplierRisk from "./SupplierRisk";

export default function Dashboard() {
  const [key, setKey] = useState("policy");

  return (
    <Container className="mt-4">
      <h1 className="mb-4">📊 Business Compliance Dashboard</h1>
      <Tabs
        id="dashboard-tabs"
        activeKey={key}
        onSelect={(k) => setKey(k)}
        className="mb-3"
      >
        <Tab eventKey="policy" title="Policy Updates">
          <PolicyUpdates />
        </Tab>
        <Tab eventKey="gst" title="GST Filing">
          <GSTFiling />
        </Tab>
        <Tab eventKey="supplier" title="Supplier Risk">
          <SupplierRisk />
        </Tab>
      </Tabs>
    </Container>
  );
}
