import { useState } from "react";
import type { Equipment } from "../types";
import { formatCurrency } from "../utils/formatters";

type EquipmentSearchProps = {
  equipment: Equipment[];
  onAddEquipment: (equipment: Equipment) => void;
};

function EquipmentSearch({ equipment, onAddEquipment }: EquipmentSearchProps) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredEquipment = equipment.filter((item) => {
    const query = searchTerm.trim().toLowerCase();
    return (
      item.name.toLowerCase().includes(query) ||
      item.category.toLowerCase().includes(query) ||
      item.brand.toLowerCase().includes(query) ||
      item.modelNumber.toLowerCase().includes(query)
    );
  });

  return (
    <section className="equipment-search">
      <input
        aria-label="Search equipment and parts"
        type="text"
        placeholder="Search equipment, brand, category, or model..."
        value={searchTerm}
        onChange={(event) => setSearchTerm(event.target.value)}
      />

      {searchTerm && filteredEquipment.length === 0 && (
        <p>No equipment or parts found.</p>
      )}

      {searchTerm && filteredEquipment.length > 0 && (
        <div className="equipment-results" aria-live="polite">
          {filteredEquipment.map((item) => (
            <div className="equipment-result" key={item.id}>
              <div className="equipment-result-copy">
                <p className="equipment-result-name">
                  <strong>{item.name}</strong>
                </p>

                <p className="equipment-result-meta">
                  {item.brand} • {item.category} • {item.modelNumber}
                </p>

                <p className="equipment-result-price">
                  {formatCurrency(item.baseCost)}
                </p>
              </div>

              <button
                type="button"
                className="primary-button equipment-add-button"
                onClick={() => onAddEquipment(item)}
              >
                Add
              </button>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default EquipmentSearch;
