import { useState } from "react";
import customersData from "./data/customers.json";
import laborRatesData from "./data/labor_rates.json";

import { normalizeCustomer } from "./utils/normalizeData";

import CustomerSelector from "./components/customerSelector";
import CustomerDetails from "./components/customerDetails";
import LaborSelector from "./components/LaborSelector";

import type { LaborRate } from "./types";

import "./App.css";

const customers = customersData.map(normalizeCustomer);
const laborRates = laborRatesData as LaborRate[];

function App() {
  const [selectedCustomerId, setSelectedCustomerId] = useState("");
  const [selectedJobType, setSelectedJobType] = useState("");
  const [selectedLevel, setSelectedLevel] = useState("");
  const [estimatedHours, setEstimatedHours] = useState(0);

  const selectedCustomer = customers.find(
    (customer) => customer.id === selectedCustomerId,
  );

  function handleJobTypeChange(jobType: string) {
    setSelectedJobType(jobType);
    setSelectedLevel("");
    setEstimatedHours(0);
  }

  return (
    <main className="app">
      <h1>Field Estimate Tool</h1>

      <CustomerSelector
        customers={customers}
        selectedCustomerId={selectedCustomerId}
        onCustomerChange={setSelectedCustomerId}
      />

      {selectedCustomer && <CustomerDetails customer={selectedCustomer} />}

      <LaborSelector
        laborRates={laborRates}
        selectedJobType={selectedJobType}
        selectedLevel={selectedLevel}
        estimatedHours={estimatedHours}
        onJobTypeChange={handleJobTypeChange}
        onLevelChange={setSelectedLevel}
        onEstimatedHoursChange={setEstimatedHours}
      />
    </main>
  );
}

export default App;
