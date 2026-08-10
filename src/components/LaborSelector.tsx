import type { LaborRate } from '../types'

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
  const jobTypes = [...new Set(laborRates.map((rate) => rate.jobType))]

  const availableLevels = laborRates.filter(
    (rate) => rate.jobType === selectedJobType
  )

  const selectedLaborRate = laborRates.find(
    (rate) =>
      rate.jobType === selectedJobType &&
      rate.level === selectedLevel
  )

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
              {jobType}
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
                {rate.level}
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
            <strong>Typical Duration:</strong>{' '}
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
              onChange={(event) =>
                onEstimatedHoursChange(Number(event.target.value))
              }
            />
          </label>

          <p>
            <strong>Labor Estimate:</strong> $
            {laborSubtotal.toFixed(2)}
          </p>
        </>
      )}
    </section>
  )
}

export default LaborSelector