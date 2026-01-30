'use client'

import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Container, Title, Button, Stepper, Paper, Group, Text } from '@mantine/core'
import { isLoggedIn } from '@/lib/utils/storage'
import { Step1Contact } from '@/components/onboarding/Step1Contact'
import { Step2Personal } from '@/components/onboarding/Step2Personal'
import { Step3Trip } from '@/components/onboarding/Step3Trip'
import { Step4TripType } from '@/components/onboarding/Step4TripType'
import { Step5Coverage } from '@/components/onboarding/Step5Coverage'
import { Step6Health } from '@/components/onboarding/Step6Health'
import { Step7Payment } from '@/components/onboarding/Step7Payment'
import type { PersonalInfo, TripInfo, TripType, Coverage, HealthInfo, Payment, Consents } from '@/lib/types'

const TOTAL_STEPS = 7

export default function OnboardingPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [active, setActive] = useState(0)
  const [formData, setFormData] = useState<{
    personalInfo?: Partial<PersonalInfo>
    tripInfo?: Partial<TripInfo>
    tripType?: Partial<TripType>
    coverage?: Partial<Coverage>
    healthInfo?: Partial<HealthInfo>
    payment?: Partial<Payment>
    consents?: Partial<Consents>
    idDocument?: string
  }>({})

  useEffect(() => {
    if (!isLoggedIn()) {
      router.push('/login')
      return
    }

    // Check if editing existing policy
    const editId = searchParams.get('edit')
    if (editId) {
      // Load policy data - will be implemented
    }
  }, [router, searchParams])

  const updateFormData = (step: number, data: any) => {
    if (step === 1) {
      // Step 1: Contact info goes into personalInfo
      setFormData(prev => ({
        ...prev,
        personalInfo: { ...prev.personalInfo, ...data }
      }))
    } else if (step === 2) {
      // Step 2: Personal info
      setFormData(prev => ({
        ...prev,
        personalInfo: { ...prev.personalInfo, ...data }
      }))
    } else {
      const stepKeys = ['', 'personalInfo', 'personalInfo', 'tripInfo', 'tripType', 'coverage', 'healthInfo', 'payment']
      const key = stepKeys[step]
      if (key) {
        setFormData(prev => ({
          ...prev,
          [key]: { ...prev[key as keyof typeof prev], ...data }
        }))
      }
    }
  }

  const handleNext = () => {
    if (active < TOTAL_STEPS - 1) {
      setActive(active + 1)
    }
  }

  const handlePrev = () => {
    if (active > 0) {
      setActive(active - 1)
    }
  }

  const handleSubmit = async (paymentData: Partial<Payment>, consentsData: Partial<Consents>, idDocument: string) => {
    // Combine all form data
    if (!formData.personalInfo?.email || !formData.personalInfo?.phone) {
      alert('Please complete all required fields')
      return
    }

    const { addPolicy } = await import('@/lib/utils/storage')
    
    const policyData = {
      personalInfo: {
        email: formData.personalInfo.email,
        phone: formData.personalInfo.phone,
        firstName: formData.personalInfo.firstName || '',
        lastName: formData.personalInfo.lastName || '',
        personalId: formData.personalInfo.personalId,
        birthDate: formData.personalInfo.birthDate,
        idType: formData.personalInfo.idType || 'czechId',
        nationality: formData.personalInfo.nationality,
        address: formData.personalInfo.address,
      } as PersonalInfo,
      tripInfo: formData.tripInfo as TripInfo,
      tripType: formData.tripType as TripType,
      coverage: formData.coverage as Coverage,
      healthInfo: formData.healthInfo as HealthInfo,
      payment: paymentData as Payment,
      consents: {
        ...consentsData,
        timestamp: new Date().toISOString()
      } as Consents,
      idDocument: idDocument
    }

    addPolicy(policyData)
    router.push('/dashboard')
  }

  return (
    <Container size="md" py="xl">
      <Title order={1} mb="xl">New Travel Insurance Policy</Title>

      <Stepper active={active} onStepClick={setActive} breakpoint="sm" mb="xl">
        <Stepper.Step label="Contact" description="Email & Phone">
          <Step1Contact
            data={formData.personalInfo}
            onNext={(data) => {
              updateFormData(1, data)
              handleNext()
            }}
          />
        </Stepper.Step>

        <Stepper.Step label="Personal" description="Identification">
          <Step2Personal
            data={formData.personalInfo}
            onNext={(data) => {
              updateFormData(2, data)
              handleNext()
            }}
            onPrev={handlePrev}
          />
        </Stepper.Step>

        <Stepper.Step label="Trip" description="Destination & Dates">
          <Step3Trip
            data={formData.tripInfo}
            onNext={(data) => {
              updateFormData(3, data)
              handleNext()
            }}
            onPrev={handlePrev}
          />
        </Stepper.Step>

        <Stepper.Step label="Type" description="Purpose & Activities">
          <Step4TripType
            data={formData.tripType}
            onNext={(data) => {
              updateFormData(4, data)
              handleNext()
            }}
            onPrev={handlePrev}
          />
        </Stepper.Step>

        <Stepper.Step label="Coverage" description="Insurance Options">
          <Step5Coverage
            data={formData.coverage}
            tripInfo={formData.tripInfo}
            onNext={(data) => {
              updateFormData(5, data)
              handleNext()
            }}
            onPrev={handlePrev}
          />
        </Stepper.Step>

        <Stepper.Step label="Health" description="Risk Information">
          <Step6Health
            data={formData.healthInfo}
            onNext={(data) => {
              updateFormData(6, data)
              handleNext()
            }}
            onPrev={handlePrev}
          />
        </Stepper.Step>

        <Stepper.Step label="Payment" description="Final Steps">
          <Step7Payment
            data={formData.payment}
            consents={formData.consents}
            onPrev={handlePrev}
            onSubmit={handleSubmit}
            onIdUpload={(data) => {
              setFormData(prev => ({ ...prev, idDocument: data }))
            }}
          />
        </Stepper.Step>
      </Stepper>
    </Container>
  )
}
