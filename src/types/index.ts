export type Customer = {
  id: string
  name: string
  address: string
  phone?: string
  propertyType?: string
  squareFootage?: number
  systemType?: string
  systemAge?: number
  lastServiceDate?: string
}

export type EstimatedHours = {
  min: number
  max: number
}

export type LaborRate = {
  jobType: string
  level: string
  hourlyRate: number
  estimatedHours: EstimatedHours
}

export type Equipment = {
  id: string;
  name: string;
  category: string;
  brand: string;
  modelNumber: string;
  baseCost: number;
};

export type EstimateItem = {
  equipment: Equipment;
  quantity: number;
};