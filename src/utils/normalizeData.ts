import type { Customer, Equipment } from '../types'

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

type RawEquipment = {
  id: string;
  name: string;
  category: string;
  brand: string;
  modelNumber: string;
  baseCost?: number;
  base_cost?: number;
};


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

export function normalizeEquipment(
  equipment: RawEquipment,
): Equipment {
  return {
    id: equipment.id,
    name: equipment.name,
    category: equipment.category,
    brand: equipment.brand,
    modelNumber: equipment.modelNumber,
    baseCost: equipment.baseCost ?? equipment.base_cost ?? 0,
  };
}
