# Field Estimate Tool

A lightweight field estimating application for HVAC technicians to create clear customer estimates quickly using customer, labor, and equipment data.

## Problem

HVAC technicians currently spend significant time looking up equipment pricing, labor rates, property information, and manually calculating estimates while customers wait.

This tool streamlines that workflow by bringing those inputs into a single interface and calculating a live estimate as the technician works.

## What I Built

The application allows a technician to:

- Select an existing customer and review property and system information
- Choose a job type and labor level
- See the applicable hourly rate and typical duration
- Enter or adjust estimated labor hours
- Search equipment and parts by name, category, brand, or model
- Add multiple equipment items to an estimate
- Adjust quantities or remove items
- View live labor, equipment, and total estimate calculations
- Reset the workflow and begin a new estimate

## Technical Approach

The application is built with:

- React
- TypeScript
- Vite
- CSS
- JSON-based source data

The supplied JSON files are treated as source data for this prototype.

I added a normalization layer before the data reaches the UI. This handles inconsistencies in the provided exports, such as `propertyType` vs. `property_type`, `squareFootage` vs. `sqft`, and `baseCost` vs. `base_cost`.

Estimate calculations are centralized in a utility function rather than being duplicated across UI components. This keeps pricing logic separate from presentation and gives the application one source of truth for labor, equipment, and grand totals.

## Application Structure

```text
src/
|-- components/
|   |-- CustomerSelector.tsx
|   |-- CustomerDetails.tsx
|   |-- LaborSelector.tsx
|   |-- EquipmentSearch.tsx
|   |-- EstimateItems.tsx
|   `-- EstimateSummary.tsx
|-- data/
|   |-- customers.json
|   |-- equipment.json
|   `-- labor_rates.json
|-- types/
|   `-- index.ts
|-- utils/
|   |-- calculateEstimate.ts
|   |-- formatters.ts
|   `-- normalizeData.ts
`-- App.tsx
```

## Running Locally

### Prerequisites

- Node.js
- npm

### Setup

```bash
git clone https://github.com/anay0304/Full-Stack-Dev-Test.git
cd Full-Stack-Dev-Test
npm install
npm run dev
```

Then open the local Vite URL shown in the terminal.

## Validation

Before submission, I verified the production build and lint checks:

```bash
npm run build
npm run lint
```

Both commands complete successfully.

I also manually tested:

- Inconsistent customer and equipment records
- Missing customer fields
- Labor-only estimates
- Equipment-only estimates
- Multiple equipment quantities
- Duplicate equipment additions
- Equipment removal
- Invalid or negative labor input
- Job type changes
- Empty equipment search results
- Full estimate reset

## Design Decisions

### Frontend-Only Prototype

For the scope of this exercise, I kept the application client-side and used the supplied JSON directly rather than introducing a database or API that would add complexity without materially improving the prototype.

The application structure separates data access, normalization, business calculations, and presentation so those JSON sources could later be replaced by API responses without requiring a full UI rewrite.

### Technician-Controlled Labor Estimate

The provided labor data contains typical minimum and maximum durations rather than an exact required duration. The application uses that range as guidance while allowing the technician to adjust expected hours based on the actual job.

### Data Normalization

The source files contain inconsistent naming conventions. Rather than handling those differences throughout the UI, the application normalizes them once at the data boundary.

## What I Would Do With More Time

With more time, I would extend the prototype with:

- Persistent saved estimates
- Technician authentication and user accounts
- Backend API and database storage
- Customer-facing PDF estimate generation
- Email or SMS delivery
- Taxes, discounts, and configurable markup rules
- Historical customer estimates and service history
- Better catalog filtering and pagination for larger datasets
- Automated unit and component tests
- Accessibility testing
- Offline support for technicians working with poor connectivity

For a production system, pricing rules and estimate calculations would also be validated server-side rather than relying only on client-side logic.
