import { useState } from "react";
import customersData from "./data/customers.json";
import laborRatesData from "./data/labor_rates.json";

import { normalizeCustomer } from "./utils/normalizeData";

import CustomerSelector from "./components/customerSelector";
import CustomerDetails from "./components/customerDetails";
import LaborSelector from "./components/LaborSelector";

import equipmentData from "./data/equipment.json";
import { normalizeEquipment } from "./utils/normalizeData";

import EquipmentSearch from "./components/EquipmentSearch";
import EstimateItems from "./components/EstimateItems";

import type { EstimateItem, LaborRate } from "./types";

import "./App.css";

const customers = customersData.map(normalizeCustomer);
const laborRates = laborRatesData as LaborRate[];
const equipment = equipmentData.map(normalizeEquipment);

function App() {
  const [selectedCustomerId, setSelectedCustomerId] = useState("");
  const [selectedJobType, setSelectedJobType] = useState("");
  const [selectedLevel, setSelectedLevel] = useState("");
  const [estimatedHours, setEstimatedHours] = useState(0);
  const [estimateItems, setEstimateItems] = useState<EstimateItem[]>([]);

  const selectedCustomer = customers.find(
    (customer) => customer.id === selectedCustomerId,
  );

  function handleJobTypeChange(jobType: string) {
    setSelectedJobType(jobType);
    setSelectedLevel("");
    setEstimatedHours(0);
  }

  function handleAddEquipment(item: (typeof equipment)[number]) {
    setEstimateItems((currentItems) => {
      const existingItem = currentItems.find(
        (estimateItem) => estimateItem.equipment.id === item.id,
      );

      if (existingItem) {
        return currentItems.map((estimateItem) =>
          estimateItem.equipment.id === item.id
            ? {
                ...estimateItem,
                quantity: estimateItem.quantity + 1,
              }
            : estimateItem,
        );
      }

      return [
        ...currentItems,
        {
          equipment: item,
          quantity: 1,
        },
      ];
    });
  }

  function handleQuantityChange(equipmentId: string, quantity: number) {
    if (quantity < 1) {
      return;
    }

    setEstimateItems((currentItems) =>
      currentItems.map((item) =>
        item.equipment.id === equipmentId ? { ...item, quantity } : item,
      ),
    );
  }

  function handleRemoveItem(equipmentId: string) {
    setEstimateItems((currentItems) =>
      currentItems.filter((item) => item.equipment.id !== equipmentId),
    );
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

      <EquipmentSearch
        equipment={equipment}
        onAddEquipment={handleAddEquipment}
      />

      <EstimateItems
        items={estimateItems}
        onQuantityChange={handleQuantityChange}
        onRemoveItem={handleRemoveItem}
      />
    </main>
  );
}

export default App;
