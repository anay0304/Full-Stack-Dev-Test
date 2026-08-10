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