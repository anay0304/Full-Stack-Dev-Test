import type { EstimateItem } from "../types";

type EstimateItemsProps = {
  items: EstimateItem[];
  onQuantityChange: (
    equipmentId: string,
    quantity: number,
  ) => void;
  onRemoveItem: (equipmentId: string) => void;
};

function EstimateItems({
  items,
  onQuantityChange,
  onRemoveItem,
}: EstimateItemsProps) {
  const subtotal = items.reduce(
    (total, item) =>
      total + item.equipment.baseCost * item.quantity,
    0,
  );

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

          <p>${item.equipment.baseCost.toFixed(2)} each</p>

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
            Line Total: $
            {(
              item.equipment.baseCost * item.quantity
            ).toFixed(2)}
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
          Equipment Subtotal: ${subtotal.toFixed(2)}
        </strong>
      </p>
    </section>
  );
}

export default EstimateItems;