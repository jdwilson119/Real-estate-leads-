export type PropertyStatus = 'vacant' | 'occupied' | 'application' | 'maintenance'

export type PropertyType = 'apartment' | 'house' | 'condo' | 'townhouse' | 'commercial'

export interface Property {
  id: string
  address: string
  unit?: string
  city: string
  state: string
  type: PropertyType
  bedrooms: number
  bathrooms: number
  sqft: number
  rent: number
  status: PropertyStatus
  availableDate: string
  leaseEnd?: string
  tenantName?: string
  daysOnMarket: number
}

export type LeadStage =
  | 'new'
  | 'contacted'
  | 'touring'
  | 'application'
  | 'approved'
  | 'leased'
  | 'lost'

export type LeadSource = 'Zillow' | 'Apartments.com' | 'Referral' | 'Website' | 'Walk-in' | 'Realtor.com'

export interface Lead {
  id: string
  name: string
  email: string
  phone: string
  propertyId: string
  stage: LeadStage
  source: LeadSource
  createdDate: string
  lastContact: string
  budget: number
  moveInDate: string
  notes?: string
}

export type ShowingStatus = 'scheduled' | 'completed' | 'cancelled' | 'no-show'

export interface Showing {
  id: string
  leadId: string
  propertyId: string
  date: string
  time: string
  status: ShowingStatus
}
