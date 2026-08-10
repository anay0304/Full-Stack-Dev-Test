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
    <section>
      <h2>Equipment & Parts</h2>

      <input
        type="text"
        placeholder="Search equipment, brand, category, or model..."
        value={searchTerm}
        onChange={(event) => setSearchTerm(event.target.value)}
      />

      {searchTerm && filteredEquipment.length === 0 && (
        <p>No equipment or parts found.</p>
      )}

      {searchTerm && filteredEquipment.length > 0 && (
        <div>
          {filteredEquipment.map((item) => (
            <div key={item.id}>
              <p>
                <strong>{item.name}</strong>
              </p>

              <p>
                {item.brand} • {item.category} • {item.modelNumber}
              </p>

              <p>{formatCurrency(item.baseCost)}</p>

              <button onClick={() => onAddEquipment(item)}>Add</button>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default EquipmentSearch;
