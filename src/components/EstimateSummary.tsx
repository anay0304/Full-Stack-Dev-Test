import type {
  Customer,
  EstimateItem,
  LaborRate,
} from "../types";

type EstimateSummaryProps = {
  customer?: Customer;
  laborRate?: LaborRate;
  estimatedHours: number;
  items: EstimateItem[];
  laborSubtotal: number;
  equipmentSubtotal: number;
  grandTotal: number;
};

function EstimateSummary({
  customer,
  laborRate,
  estimatedHours,
  items,
  laborSubtotal,
  equipmentSubtotal,
  grandTotal,
}: EstimateSummaryProps) {
  const hasEstimate =
    laborSubtotal > 0 || equipmentSubtotal > 0;

  if (!hasEstimate) {
    return null;
  }

  return (
    <section>
      <h2>Estimate Summary</h2>

      {customer && (
        <div>
          <h3>Customer</h3>
          <p><strong>{customer.name}</strong></p>
          <p>{customer.address}</p>
        </div>
      )}

      {laborRate && estimatedHours > 0 && (
        <div>
          <h3>Labor</h3>

          <p>
            {laborRate.jobType} — {laborRate.level}
          </p>

          <p>
            {estimatedHours} hours × ${laborRate.hourlyRate.toFixed(2)}
          </p>

          <p>
            <strong>${laborSubtotal.toFixed(2)}</strong>
          </p>
        </div>
      )}

      {items.length > 0 && (
        <div>
          <h3>Equipment & Parts</h3>

          {items.map((item) => (
            <div key={item.equipment.id}>
              <p>
                {item.equipment.name} × {item.quantity}
              </p>

              <p>
                $
                {(
                  item.equipment.baseCost *
                  item.quantity
                ).toFixed(2)}
              </p>
            </div>
          ))}

          <p>
            <strong>
              Equipment Subtotal: $
              {equipmentSubtotal.toFixed(2)}
            </strong>
          </p>
        </div>
      )}

      <hr />

      <p>
        <strong>
          Estimated Total: ${grandTotal.toFixed(2)}
        </strong>
      </p>
    </section>
  );
}

export default EstimateSummary;