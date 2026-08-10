import type { Customer, EstimateItem, LaborRate } from "../types";

import { formatCurrency, formatLabel } from "../utils/formatters";

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
  const hasEstimate = laborSubtotal > 0 || equipmentSubtotal > 0;

  if (!hasEstimate) {
    return (
      <section className="estimate-summary empty-summary">
        <div className="summary-heading">
          <p className="eyebrow">Live Estimate</p>
          <h2>Estimate Summary</h2>
        </div>

        <p className="empty-summary-copy">
          Add labor or equipment to begin building an estimate.
        </p>
      </section>
    );
  }

  return (
    <section className="estimate-summary">
      <div className="summary-heading">
        <p className="eyebrow">Live Estimate</p>
        <h2>Estimate Summary</h2>
      </div>

      {customer && (
        <div className="summary-section">
          <h3>Customer</h3>

          <p className="summary-customer-name">{customer.name}</p>

          <p className="summary-muted">{customer.address}</p>
        </div>
      )}

      {laborRate && estimatedHours > 0 && (
        <div className="summary-section">
          <div className="summary-section-header">
            <h3>Labor</h3>

            <strong>{formatCurrency(laborSubtotal)}</strong>
          </div>

          <p>
            {formatLabel(laborRate.jobType)} — {formatLabel(laborRate.level)}
          </p>

          <p className="summary-muted">
            {estimatedHours} hours × {formatCurrency(laborRate.hourlyRate)}/hour
          </p>
        </div>
      )}

      {items.length > 0 && (
        <div className="summary-section">
          <div className="summary-section-header">
            <h3>Equipment & Parts</h3>

            <strong>{formatCurrency(equipmentSubtotal)}</strong>
          </div>

          <div className="summary-items">
            {items.map((item) => {
              const lineTotal = item.equipment.baseCost * item.quantity;

              return (
                <div className="summary-item" key={item.equipment.id}>
                  <div>
                    <p className="summary-item-name">{item.equipment.name}</p>

                    <p className="summary-muted">
                      {formatCurrency(item.equipment.baseCost)} ×{" "}
                      {item.quantity}
                    </p>
                  </div>

                  <strong>{formatCurrency(lineTotal)}</strong>
                </div>
              );
            })}
          </div>
        </div>
      )}

      <div className="grand-total">
        <span>Estimated Total</span>

        <strong>{formatCurrency(grandTotal)}</strong>
      </div>
    </section>
  );
}

export default EstimateSummary;
