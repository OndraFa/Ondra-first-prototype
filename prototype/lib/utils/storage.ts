// Storage utilities for Travel Insurance Broker
// Client-side localStorage management

import type { User, Policy, Transaction, PersonalInfo, TripInfo, TripType, Coverage, HealthInfo, Payment, Consents } from '@/lib/types'

const STORAGE_KEYS = {
  USER: 'user',
  POLICIES: 'policies',
  FORM_PROGRESS: 'formProgress',
  TRANSACTIONS: 'transactions',
} as const

// User Management
export function getCurrentUser(): User | null {
  if (typeof window === 'undefined') return null
  try {
    const user = localStorage.getItem(STORAGE_KEYS.USER)
    return user ? JSON.parse(user) : null
  } catch {
    return null
  }
}

export function isLoggedIn(): boolean {
  const user = getCurrentUser()
  return user?.loggedIn === true
}

export function setUser(user: User): void {
  if (typeof window === 'undefined') return
  localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user))
}

export function logout(): void {
  if (typeof window === 'undefined') return
  localStorage.removeItem(STORAGE_KEYS.USER)
  sessionStorage.removeItem(STORAGE_KEYS.USER)
}

// Policy Management
export function getPolicies(): Policy[] {
  if (typeof window === 'undefined') return []
  try {
    const policies = localStorage.getItem(STORAGE_KEYS.POLICIES)
    return policies ? JSON.parse(policies) : []
  } catch {
    return []
  }
}

export function savePolicies(policies: Policy[]): void {
  if (typeof window === 'undefined') return
  localStorage.setItem(STORAGE_KEYS.POLICIES, JSON.stringify(policies))
}

export function addPolicy(policyData: {
  personalInfo: PersonalInfo
  tripInfo: TripInfo
  tripType: TripType
  coverage: Coverage
  healthInfo: HealthInfo
  payment: Payment
  consents: Consents
  idDocument?: string
}): Policy {
  const policies = getPolicies()
  const policyId = 'POL-' + Date.now().toString().slice(-8)
  
  const newPolicy: Policy = {
    id: policyId,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    status: 'active',
    personalInfo: policyData.personalInfo,
    tripInfo: policyData.tripInfo,
    tripType: policyData.tripType,
    coverage: policyData.coverage,
    healthInfo: policyData.healthInfo,
    payment: policyData.payment,
    consents: policyData.consents,
    idDocument: policyData.idDocument,
  }
  
  policies.push(newPolicy)
  savePolicies(policies)
  
  // Add transaction
  addTransaction({
    type: 'policy_created',
    policyId: policyId,
    timestamp: new Date().toISOString(),
    description: `Policy ${policyId} created`,
  })
  
  return newPolicy
}

export function getPolicy(policyId: string): Policy | null {
  const policies = getPolicies()
  return policies.find(p => p.id === policyId) || null
}

export function updatePolicy(policyId: string, updates: Partial<Policy>): boolean {
  const policies = getPolicies()
  const index = policies.findIndex(p => p.id === policyId)
  
  if (index === -1) return false
  
  policies[index] = {
    ...policies[index],
    ...updates,
    updatedAt: new Date().toISOString(),
  }
  
  savePolicies(policies)
  
  addTransaction({
    type: 'policy_updated',
    policyId: policyId,
    timestamp: new Date().toISOString(),
    description: `Policy ${policyId} updated`,
  })
  
  return true
}

export function cancelPolicy(policyId: string): boolean {
  const policies = getPolicies()
  const index = policies.findIndex(p => p.id === policyId)
  
  if (index === -1) return false
  
  policies[index].status = 'cancelled'
  policies[index].cancelledAt = new Date().toISOString()
  policies[index].updatedAt = new Date().toISOString()
  
  savePolicies(policies)
  
  addTransaction({
    type: 'policy_cancelled',
    policyId: policyId,
    timestamp: new Date().toISOString(),
    description: `Policy ${policyId} cancelled`,
  })
  
  return true
}

// Transaction Management
export function getTransactions(): Transaction[] {
  if (typeof window === 'undefined') return []
  try {
    const transactions = localStorage.getItem(STORAGE_KEYS.TRANSACTIONS)
    return transactions ? JSON.parse(transactions) : []
  } catch {
    return []
  }
}

export function addTransaction(transaction: Transaction): void {
  if (typeof window === 'undefined') return
  const transactions = getTransactions()
  transactions.unshift(transaction)
  
  // Keep only last 100
  if (transactions.length > 100) {
    transactions.splice(100)
  }
  
  localStorage.setItem(STORAGE_KEYS.TRANSACTIONS, JSON.stringify(transactions))
}

// Form Progress
export interface FormProgress {
  currentStep: number
  data: Record<string, any>
  lastSaved: string
}

export function saveFormProgress(step: number, data: Record<string, any>): void {
  if (typeof window === 'undefined') return
  const progress: FormProgress = {
    currentStep: step,
    data: data,
    lastSaved: new Date().toISOString(),
  }
  localStorage.setItem(STORAGE_KEYS.FORM_PROGRESS, JSON.stringify(progress))
}

export function getFormProgress(): FormProgress | null {
  if (typeof window === 'undefined') return null
  try {
    const progress = localStorage.getItem(STORAGE_KEYS.FORM_PROGRESS)
    return progress ? JSON.parse(progress) : null
  } catch {
    return null
  }
}

export function clearFormProgress(): void {
  if (typeof window === 'undefined') return
  localStorage.removeItem(STORAGE_KEYS.FORM_PROGRESS)
}
