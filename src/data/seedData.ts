import type { Lead, Property, Showing } from '../types'

// Dates are anchored to "today" so the dashboard always looks current.
const today = new Date('2026-09-18T00:00:00')

function addDays(days: number): string {
  const d = new Date(today)
  d.setDate(d.getDate() + days)
  return d.toISOString().slice(0, 10)
}

export const properties: Property[] = [
  { id: 'p1', address: '412 Maple Ave', unit: '2B', city: 'Austin', state: 'TX', type: 'apartment', bedrooms: 2, bathrooms: 1, sqft: 920, rent: 1850, status: 'vacant', availableDate: addDays(-5), daysOnMarket: 22 },
  { id: 'p2', address: '88 Riverside Dr', unit: '5A', city: 'Austin', state: 'TX', type: 'apartment', bedrooms: 1, bathrooms: 1, sqft: 640, rent: 1450, status: 'occupied', availableDate: addDays(200), leaseEnd: addDays(200), tenantName: 'Marcus Webb', daysOnMarket: 0 },
  { id: 'p3', address: '215 Oak Hollow Ln', city: 'Round Rock', state: 'TX', type: 'house', bedrooms: 4, bathrooms: 3, sqft: 2400, rent: 2950, status: 'occupied', availableDate: addDays(64), leaseEnd: addDays(64), tenantName: 'The Ferreira Family', daysOnMarket: 0 },
  { id: 'p4', address: '1601 Congress Lofts', unit: '910', city: 'Austin', state: 'TX', type: 'condo', bedrooms: 2, bathrooms: 2, sqft: 1150, rent: 2600, status: 'application', availableDate: addDays(10), daysOnMarket: 14 },
  { id: 'p5', address: '77 Sunset Terrace', city: 'Cedar Park', state: 'TX', type: 'townhouse', bedrooms: 3, bathrooms: 2.5, sqft: 1800, rent: 2400, status: 'vacant', availableDate: addDays(-2), daysOnMarket: 31 },
  { id: 'p6', address: '900 Barton Springs Rd', unit: '4C', city: 'Austin', state: 'TX', type: 'apartment', bedrooms: 1, bathrooms: 1, sqft: 700, rent: 1600, status: 'occupied', availableDate: addDays(18), leaseEnd: addDays(18), tenantName: 'Priya Nair', daysOnMarket: 0 },
  { id: 'p7', address: '34 Willow Creek Ct', city: 'Pflugerville', state: 'TX', type: 'house', bedrooms: 3, bathrooms: 2, sqft: 1950, rent: 2250, status: 'maintenance', availableDate: addDays(6), daysOnMarket: 9 },
  { id: 'p8', address: '505 East 6th St', unit: '12', city: 'Austin', state: 'TX', type: 'condo', bedrooms: 1, bathrooms: 1, sqft: 800, rent: 1900, status: 'occupied', availableDate: addDays(45), leaseEnd: addDays(45), tenantName: 'Jordan Ellis', daysOnMarket: 0 },
  { id: 'p9', address: '221 Slaughter Ln', unit: '3D', city: 'Austin', state: 'TX', type: 'apartment', bedrooms: 2, bathrooms: 2, sqft: 1020, rent: 1975, status: 'vacant', availableDate: addDays(-12), daysOnMarket: 40 },
  { id: 'p10', address: '19 Lakeview Pass', city: 'Leander', state: 'TX', type: 'house', bedrooms: 4, bathrooms: 3, sqft: 2600, rent: 3100, status: 'occupied', availableDate: addDays(120), leaseEnd: addDays(120), tenantName: 'The Okafor Family', daysOnMarket: 0 },
  { id: 'p11', address: '3300 Guadalupe St', unit: '6F', city: 'Austin', state: 'TX', type: 'apartment', bedrooms: 1, bathrooms: 1, sqft: 610, rent: 1400, status: 'application', availableDate: addDays(3), daysOnMarket: 17 },
  { id: 'p12', address: '128 Commerce Park Blvd', city: 'Austin', state: 'TX', type: 'commercial', bedrooms: 0, bathrooms: 2, sqft: 3200, rent: 5400, status: 'vacant', availableDate: addDays(-30), daysOnMarket: 58 },
  { id: 'p13', address: '760 Westgate Cir', unit: '2', city: 'Austin', state: 'TX', type: 'townhouse', bedrooms: 3, bathrooms: 2, sqft: 1700, rent: 2350, status: 'occupied', availableDate: addDays(30), leaseEnd: addDays(30), tenantName: 'Sam & Riley Chen', daysOnMarket: 0 },
  { id: 'p14', address: '44 Spicewood Springs Rd', unit: '8B', city: 'Austin', state: 'TX', type: 'apartment', bedrooms: 2, bathrooms: 1, sqft: 880, rent: 1750, status: 'vacant', availableDate: addDays(1), daysOnMarket: 6 },
]

export const leads: Lead[] = [
  { id: 'l1', name: 'Casey Morgan', email: 'casey.morgan@example.com', phone: '512-555-0142', propertyId: 'p1', stage: 'touring', source: 'Zillow', createdDate: addDays(-9), lastContact: addDays(-1), budget: 1900, moveInDate: addDays(20) },
  { id: 'l2', name: 'Diego Alvarez', email: 'diego.alvarez@example.com', phone: '512-555-0198', propertyId: 'p5', stage: 'application', source: 'Referral', createdDate: addDays(-15), lastContact: addDays(-2), budget: 2500, moveInDate: addDays(15) },
  { id: 'l3', name: 'Emily Zhang', email: 'emily.zhang@example.com', phone: '737-555-0110', propertyId: 'p9', stage: 'new', source: 'Apartments.com', createdDate: addDays(-1), lastContact: addDays(-1), budget: 2000, moveInDate: addDays(30) },
  { id: 'l4', name: 'Liam O’Brien', email: 'liam.obrien@example.com', phone: '512-555-0177', propertyId: 'p12', stage: 'contacted', source: 'Website', createdDate: addDays(-6), lastContact: addDays(-3), budget: 5500, moveInDate: addDays(45) },
  { id: 'l5', name: 'Aaliyah Brooks', email: 'aaliyah.brooks@example.com', phone: '512-555-0133', propertyId: 'p4', stage: 'approved', source: 'Zillow', createdDate: addDays(-20), lastContact: addDays(-1), budget: 2700, moveInDate: addDays(10) },
  { id: 'l6', name: 'Noah Kim', email: 'noah.kim@example.com', phone: '512-555-0166', propertyId: 'p14', stage: 'touring', source: 'Realtor.com', createdDate: addDays(-4), lastContact: addDays(0), budget: 1850, moveInDate: addDays(14) },
  { id: 'l7', name: 'Sophia Rossi', email: 'sophia.rossi@example.com', phone: '512-555-0121', propertyId: 'p7', stage: 'new', source: 'Walk-in', createdDate: addDays(-2), lastContact: addDays(-2), budget: 2300, moveInDate: addDays(25) },
  { id: 'l8', name: 'Ethan Walsh', email: 'ethan.walsh@example.com', phone: '512-555-0109', propertyId: 'p11', stage: 'application', source: 'Zillow', createdDate: addDays(-11), lastContact: addDays(-1), budget: 1500, moveInDate: addDays(8) },
  { id: 'l9', name: 'Grace Thompson', email: 'grace.thompson@example.com', phone: '512-555-0188', propertyId: 'p1', stage: 'contacted', source: 'Referral', createdDate: addDays(-3), lastContact: addDays(-1), budget: 1950, moveInDate: addDays(21) },
  { id: 'l10', name: 'Malik Johnson', email: 'malik.johnson@example.com', phone: '512-555-0155', propertyId: 'p9', stage: 'lost', source: 'Apartments.com', createdDate: addDays(-25), lastContact: addDays(-10), budget: 1800, moveInDate: addDays(5) },
  { id: 'l11', name: 'Isabel Marquez', email: 'isabel.marquez@example.com', phone: '512-555-0144', propertyId: 'p5', stage: 'new', source: 'Website', createdDate: addDays(0), lastContact: addDays(0), budget: 2450, moveInDate: addDays(35) },
  { id: 'l12', name: 'Tyler Nguyen', email: 'tyler.nguyen@example.com', phone: '512-555-0190', propertyId: 'p14', stage: 'leased', source: 'Zillow', createdDate: addDays(-30), lastContact: addDays(-5), budget: 1800, moveInDate: addDays(2) },
  { id: 'l13', name: 'Hannah Foster', email: 'hannah.foster@example.com', phone: '512-555-0163', propertyId: 'p4', stage: 'touring', source: 'Referral', createdDate: addDays(-7), lastContact: addDays(-1), budget: 2650, moveInDate: addDays(18) },
  { id: 'l14', name: 'Ben Carter', email: 'ben.carter@example.com', phone: '512-555-0172', propertyId: 'p12', stage: 'lost', source: 'Website', createdDate: addDays(-40), lastContact: addDays(-20), budget: 5000, moveInDate: addDays(-5) },
]

export const showings: Showing[] = [
  { id: 's1', leadId: 'l1', propertyId: 'p1', date: addDays(0), time: '10:00 AM', status: 'scheduled' },
  { id: 's2', leadId: 'l6', propertyId: 'p14', date: addDays(0), time: '2:30 PM', status: 'scheduled' },
  { id: 's3', leadId: 'l13', propertyId: 'p4', date: addDays(1), time: '11:00 AM', status: 'scheduled' },
  { id: 's4', leadId: 'l9', propertyId: 'p1', date: addDays(2), time: '4:00 PM', status: 'scheduled' },
  { id: 's5', leadId: 'l7', propertyId: 'p7', date: addDays(3), time: '9:30 AM', status: 'scheduled' },
  { id: 's6', leadId: 'l11', propertyId: 'p5', date: addDays(4), time: '1:00 PM', status: 'scheduled' },
  { id: 's7', leadId: 'l3', propertyId: 'p9', date: addDays(5), time: '3:00 PM', status: 'scheduled' },
  { id: 's8', leadId: 'l2', propertyId: 'p5', date: addDays(-3), time: '10:30 AM', status: 'completed' },
  { id: 's9', leadId: 'l5', propertyId: 'p4', date: addDays(-6), time: '2:00 PM', status: 'completed' },
  { id: 's10', leadId: 'l10', propertyId: 'p9', date: addDays(-8), time: '11:30 AM', status: 'no-show' },
  { id: 's11', leadId: 'l8', propertyId: 'p11', date: addDays(-4), time: '4:30 PM', status: 'completed' },
  { id: 's12', leadId: 'l4', propertyId: 'p12', date: addDays(-1), time: '1:30 PM', status: 'cancelled' },
]
