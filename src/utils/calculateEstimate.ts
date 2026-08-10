import type { EstimateItem, LaborRate } from "../types";

type EstimateCalculationInput = {
  selectedLaborRate?: LaborRate;
  estimatedHours: number;
  items: EstimateItem[];
};

export type EstimateTotals = {
  laborSubtotal: number;
  equipmentSubtotal: number;
  grandTotal: number;
};

export function calculateEstimate({
  selectedLaborRate,
  estimatedHours,
  items,
}: EstimateCalculationInput): EstimateTotals {
  const laborSubtotal = selectedLaborRate
    ? selectedLaborRate.hourlyRate * estimatedHours
    : 0;

  const equipmentSubtotal = items.reduce(
    (total, item) =>
      total + item.equipment.baseCost * item.quantity,
    0,
  );

  return {
    laborSubtotal,
    equipmentSubtotal,
    grandTotal: laborSubtotal + equipmentSubtotal,
  };
}