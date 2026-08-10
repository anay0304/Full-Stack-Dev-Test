import type { EstimateItem } from "../types";
import { formatCurrency } from "../utils/formatters";

type EstimateItemsProps = {
  items: EstimateItem[];
  equipmentSubtotal: number;
  onQuantityChange: (
    equipmentId: string,
    quantity: number,
  ) => void;
  onRemoveItem: (equipmentId: string) => void;
};

function EstimateItems({
  items,
  equipmentSubtotal,
  onQuantityChange,
  onRemoveItem,
}: EstimateItemsProps) {
  if (items.length === 0) {
    return null;
  }

  return (
    <section>
      <h2>Selected Equipment</h2>

      {items.map((item) => (
        <div key={item.equipment.id}>
          <p>
            <strong>{item.equipment.name}</strong>
          </p>

          <p>{formatCurrency(item.equipment.baseCost)} each</p>

          <label>
            Quantity
            <input
              type="number"
              min="1"
              value={item.quantity}
              onChange={(event) =>
                onQuantityChange(
                  item.equipment.id,
                  Number(event.target.value),
                )
              }
            />
          </label>

          <p>
            Line Total: 
            {formatCurrency(item.equipment.baseCost * item.quantity)}
          </p>

          <button
            onClick={() =>
              onRemoveItem(item.equipment.id)
            }
          >
            Remove
          </button>
        </div>
      ))}

      <p>
        <strong>
          Equipment Subtotal: ${formatCurrency(equipmentSubtotal)}
        </strong>
      </p>
    </section>
  );
}

export default EstimateItems;