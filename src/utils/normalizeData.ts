import type { Customer } from '../types'

type RawCustomer = {
  id: string
  name: string
  address: string
  phone?: string
  propertyType?: string
  property_type?: string
  squareFootage?: number
  sqft?: number
  systemType?: string
  systemAge?: number
  lastServiceDate?: string
}

export function normalizeCustomer(customer: RawCustomer): Customer {
  return {
    id: customer.id,
    name: customer.name,
    address: customer.address,
    phone: customer.phone,
    propertyType: customer.propertyType ?? customer.property_type,
    squareFootage: customer.squareFootage ?? customer.sqft,
    systemType: customer.systemType,
    systemAge: customer.systemAge,
    lastServiceDate: customer.lastServiceDate,
  }
}