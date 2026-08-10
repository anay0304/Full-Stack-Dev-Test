import type { LaborRate } from "../types";
import { formatCurrency, formatLabel } from "../utils/formatters";

type LaborSelectorProps = {
  laborRates: LaborRate[];
  selectedJobType: string;
  selectedLevel: string;
  estimatedHours: number;
  laborSubtotal: number;
  onJobTypeChange: (jobType: string) => void;
  onLevelChange: (level: string) => void;
  onEstimatedHoursChange: (hours: number) => void;
};

function LaborSelector({
  laborRates,
  selectedJobType,
  selectedLevel,
  estimatedHours,
  laborSubtotal,
  onJobTypeChange,
  onLevelChange,
  onEstimatedHoursChange,
}: LaborSelectorProps) {
  const jobTypes = [...new Set(laborRates.map((rate) => rate.jobType))];

  const availableLevels = laborRates.filter(
    (rate) => rate.jobType === selectedJobType,
  );

  const selectedLaborRate = laborRates.find(
    (rate) => rate.jobType === selectedJobType && rate.level === selectedLevel,
  );

  return (
    <section>
      <h2>Labor</h2>

      <label>
        Job Type
        <select
          value={selectedJobType}
          onChange={(event) => onJobTypeChange(event.target.value)}
        >
          <option value="">Choose a job type</option>

          {jobTypes.map((jobType) => (
            <option key={jobType} value={jobType}>
              {formatLabel(jobType)}
            </option>
          ))}
        </select>
      </label>

      {selectedJobType && (
        <label>
          Level
          <select
            value={selectedLevel}
            onChange={(event) => onLevelChange(event.target.value)}
          >
            <option value="">Choose a level</option>

            {availableLevels.map((rate) => (
              <option key={rate.level} value={rate.level}>
                {formatLabel(rate.level)}
              </option>
            ))}
          </select>
        </label>
      )}

      {selectedLaborRate && (
        <>
          <p>
            <strong>Hourly Rate:</strong> ${selectedLaborRate.hourlyRate}/hour
          </p>

          <p>
            <strong>Typical Duration:</strong>{" "}
            {selectedLaborRate.estimatedHours.min}–
            {selectedLaborRate.estimatedHours.max} hours
          </p>

          <label>
            Estimated Hours
            <input
              type="number"
              min="0"
              step="0.5"
              value={estimatedHours}
              onChange={(event) => {
                const value = Number(event.target.value);

                onEstimatedHoursChange(
                  Number.isFinite(value) && value >= 0 ? value : 0,
                );
              }}
            />
          </label>

          <p>
            <strong>Labor Estimate:</strong> {formatCurrency(laborSubtotal)}
          </p>
        </>
      )}
    </section>
  );
}

export default LaborSelector;
