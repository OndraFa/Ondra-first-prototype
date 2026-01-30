// Type definitions for Travel Insurance Broker

export interface User {
  email: string
  username: string
  loggedIn: boolean
  loginTime?: string
  rememberMe?: boolean
}

export interface PersonalInfo {
  email: string
  phone: string
  firstName?: string
  lastName?: string
  personalId?: string
  birthDate?: string
  idType: 'czechId' | 'birthDate'
  nationality?: string
  address?: string
}

export interface TripInfo {
  destination: 'CZ' | 'EU' | 'WORLD'
  departureDate: string
  returnDate: string
  tripType: 'one-time' | 'repeated'
  adults: number
  children: number
}

export interface TripType {
  purpose: 'recreational' | 'business' | 'study' | 'sports'
  sportsActivities: 'yes' | 'no'
  sportsType?: 'recreational' | 'risky' | 'extreme'
}

export interface Coverage {
  medicalLimit: '50000' | '100000' | '200000'
  accidentInsurance: boolean
  baggageInsurance: boolean
  liabilityInsurance: boolean
  tripCancellation: boolean
  assistanceServices: boolean
  carAssistance: boolean
  pets: boolean
  covid: boolean
}

export interface HealthInfo {
  chronicIllness: 'yes' | 'no'
  recentTreatment: 'yes' | 'no'
  pregnancy: 'yes' | 'no'
  pregnancyWeek?: number
}

export interface Payment {
  paymentMethod: 'card' | 'transfer' | 'apple' | 'google'
  billingAddress?: string
}

export interface Consents {
  gdpr: boolean
  terms: boolean
  ipid: boolean
  truthfulness: boolean
  remote: boolean
  timestamp: string
}

export interface Policy {
  id: string
  createdAt: string
  updatedAt: string
  status: 'active' | 'cancelled' | 'expired'
  personalInfo: PersonalInfo
  tripInfo: TripInfo
  tripType: TripType
  coverage: Coverage
  healthInfo: HealthInfo
  payment: Payment
  consents: Consents
  idDocument?: string // Base64
  cancelledAt?: string
}

export interface Transaction {
  type: 'policy_created' | 'policy_updated' | 'policy_cancelled'
  policyId: string
  timestamp: string
  description: string
}
