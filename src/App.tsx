import { useState } from "react";

import customersData from "./data/customers.json";
import laborRatesData from "./data/labor_rates.json";
import equipmentData from "./data/equipment.json";

import { normalizeCustomer, normalizeEquipment } from "./utils/normalizeData";

import { calculateEstimate } from "./utils/calculateEstimate";

import CustomerSelector from "./components/CustomerSelector";
import CustomerDetails from "./components/CustomerDetails";
import LaborSelector from "./components/LaborSelector";
import EquipmentSearch from "./components/EquipmentSearch";
import EstimateItems from "./components/EstimateItems";
import EstimateSummary from "./components/EstimateSummary";

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
  const [estimateResetKey, setEstimateResetKey] = useState(0);

  const selectedCustomer = customers.find(
    (customer) => customer.id === selectedCustomerId,
  );

  const selectedLaborRate = laborRates.find(
    (rate) => rate.jobType === selectedJobType && rate.level === selectedLevel,
  );

  const totals = calculateEstimate({
    selectedLaborRate,
    estimatedHours,
    items: estimateItems,
  });

  function handleJobTypeChange(jobType: string) {
    setSelectedJobType(jobType);
    setSelectedLevel("");
    setEstimatedHours(0);
  }

  function handleLevelChange(level: string) {
    setSelectedLevel(level);

    const rate = laborRates.find(
      (laborRate) =>
        laborRate.jobType === selectedJobType && laborRate.level === level,
    );

    setEstimatedHours(rate?.estimatedHours.min ?? 0);
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

  function handleClearEstimate() {
    setSelectedCustomerId("");
    setSelectedJobType("");
    setSelectedLevel("");
    setEstimatedHours(0);
    setEstimateItems([]);
    setEstimateResetKey((currentKey) => currentKey + 1);
  }

  return (
    <div className="app-shell">
      <header className="app-header">
        <div>
          <p className="eyebrow">Field Operations</p>
          <h1>Field Estimate Tool</h1>
          <p className="header-copy">
            Build a clear customer estimate in minutes.
          </p>
        </div>

        {(selectedCustomerId ||
          selectedJobType ||
          estimateItems.length > 0) && (
          <button
            type="button"
            className="secondary-button"
            onClick={handleClearEstimate}
          >
            New Estimate
          </button>
        )}
      </header>

      <main className="estimate-layout">
        <div className="estimate-builder">
          <section className="panel">
            <div className="section-heading">
              <span className="step-number">1</span>
              <div>
                <h2>Customer</h2>
                <p>Select the customer and review property details.</p>
              </div>
            </div>

            <CustomerSelector
              customers={customers}
              selectedCustomerId={selectedCustomerId}
              onCustomerChange={setSelectedCustomerId}
            />

            {selectedCustomer && (
              <CustomerDetails customer={selectedCustomer} />
            )}
          </section>

          <section className="panel">
            <div className="section-heading">
              <span className="step-number">2</span>
              <div>
                <h2>Labor</h2>
                <p>Choose the work type and expected time on site.</p>
              </div>
            </div>

            <LaborSelector
              laborRates={laborRates}
              selectedJobType={selectedJobType}
              selectedLevel={selectedLevel}
              estimatedHours={estimatedHours}
              laborSubtotal={totals.laborSubtotal}
              onJobTypeChange={handleJobTypeChange}
              onLevelChange={handleLevelChange}
              onEstimatedHoursChange={setEstimatedHours}
            />
          </section>

          <section className="panel">
            <div className="section-heading">
              <span className="step-number">3</span>
              <div>
                <h2>Equipment & Parts</h2>
                <p>Search the catalog and add required items.</p>
              </div>
            </div>

            <EquipmentSearch
              key={estimateResetKey}
              equipment={equipment}
              onAddEquipment={handleAddEquipment}
            />

            <EstimateItems
              items={estimateItems}
              equipmentSubtotal={totals.equipmentSubtotal}
              onQuantityChange={handleQuantityChange}
              onRemoveItem={handleRemoveItem}
            />
          </section>
        </div>

        <aside className="summary-panel">
          <EstimateSummary
            customer={selectedCustomer}
            laborRate={selectedLaborRate}
            estimatedHours={estimatedHours}
            items={estimateItems}
            laborSubtotal={totals.laborSubtotal}
            equipmentSubtotal={totals.equipmentSubtotal}
            grandTotal={totals.grandTotal}
          />
        </aside>
      </main>
    </div>
  );
}

export default App;
