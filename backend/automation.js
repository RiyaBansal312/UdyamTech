import cron from "node-cron";
import Policy from "./models/Policy.js";
import Supplier from "./models/Supplier.js";

// 1️⃣ Auto-add a dummy policy every 2 minutes
cron.schedule("*/2 * * * *", async () => {
  const timestamp = new Date().toLocaleTimeString();
  const policy = new Policy({
    title: `Dummy Govt Policy @ ${timestamp}`,
    summary: `This is an automated sample policy generated at ${timestamp}`
  });
  await policy.save();
  console.log(`📢 Auto Policy Added: ${policy.title}`);
});

// 2️⃣ Auto-flag a random supplier every 3 minutes
cron.schedule("*/3 * * * *", async () => {
  const suppliers = await Supplier.find({ complianceStatus: "OK" });
  if (suppliers.length > 0) {
    const randomSupplier = suppliers[Math.floor(Math.random() * suppliers.length)];
    randomSupplier.complianceStatus = "FLAGGED";
    await randomSupplier.save();
    console.log(`⚠️ Supplier flagged: ${randomSupplier.name}`);
  }
});
