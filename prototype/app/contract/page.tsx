'use client'

export const dynamic = 'force-dynamic'

import { useEffect, useState, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Container, Paper, Title, Text, Button, Group, Stack } from '@mantine/core'
import { getPolicy } from '@/lib/utils/storage'
import type { Policy } from '@/lib/types'

function ContractContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [policy, setPolicy] = useState<Policy | null>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const policyId = searchParams.get('id')
    if (policyId && typeof window !== 'undefined') {
      try {
        const foundPolicy = getPolicy(policyId)
        setPolicy(foundPolicy)
      } catch (error) {
        console.error('Error loading policy:', error)
      }
    }
  }, [searchParams])

  const handlePrint = () => {
    if (typeof window !== 'undefined') {
      window.print()
    }
  }

  const handleDownloadPDF = () => {
    // PDF generation will be implemented
    if (typeof window !== 'undefined') {
      alert('PDF download will be implemented')
    }
  }

  if (!mounted) {
    return (
      <Container size="md" py="xl">
        <Text>Loading...</Text>
      </Container>
    )
  }

  if (!policy) {
    return (
      <Container size="md" py="xl">
        <Text>Policy not found</Text>
        <Button mt="md" onClick={() => router.push('/dashboard')}>
          Back to Dashboard
        </Button>
      </Container>
    )
  }

  return (
    <Container size="md" py="xl">
      <Group justify="space-between" mb="xl">
        <Title order={1}>Insurance Contract</Title>
        <Group>
          <Button variant="light" onClick={handleDownloadPDF}>
            Download PDF
          </Button>
          <Button variant="light" onClick={handlePrint}>
            Print
          </Button>
          <Button variant="default" onClick={() => router.push('/dashboard')}>
            Back to Dashboard
          </Button>
        </Group>
      </Group>

      <Paper p="xl" withBorder>
        <Stack gap="lg">
          <div>
            <Title order={3} mb="sm">Policy Information</Title>
            <Text><strong>Policy ID:</strong> {policy.id}</Text>
            <Text><strong>Status:</strong> {policy.status}</Text>
            <Text><strong>Created:</strong> {new Date(policy.createdAt).toLocaleString()}</Text>
          </div>

          <div>
            <Title order={3} mb="sm">Insured Person</Title>
            <Text><strong>Name:</strong> {policy.personalInfo.firstName} {policy.personalInfo.lastName}</Text>
            <Text><strong>Email:</strong> {policy.personalInfo.email}</Text>
            <Text><strong>Phone:</strong> {policy.personalInfo.phone}</Text>
            {policy.personalInfo.address && (
              <Text><strong>Address:</strong> {policy.personalInfo.address}</Text>
            )}
          </div>

          <div>
            <Title order={3} mb="sm">Trip Details</Title>
            <Text><strong>Destination:</strong> {policy.tripInfo.destination}</Text>
            <Text><strong>Departure:</strong> {new Date(policy.tripInfo.departureDate).toLocaleDateString()}</Text>
            <Text><strong>Return:</strong> {new Date(policy.tripInfo.returnDate).toLocaleDateString()}</Text>
            <Text><strong>Adults:</strong> {policy.tripInfo.adults}</Text>
            {policy.tripInfo.children > 0 && (
              <Text><strong>Children:</strong> {policy.tripInfo.children}</Text>
            )}
          </div>

          <div>
            <Title order={3} mb="sm">Coverage</Title>
            <Text><strong>Medical Limit:</strong> {policy.coverage.medicalLimit}</Text>
            <Text><strong>Accident Insurance:</strong> {policy.coverage.accidentInsurance ? 'Yes' : 'No'}</Text>
            <Text><strong>Baggage Insurance:</strong> {policy.coverage.baggageInsurance ? 'Yes' : 'No'}</Text>
            <Text><strong>Liability Insurance:</strong> {policy.coverage.liabilityInsurance ? 'Yes' : 'No'}</Text>
            <Text><strong>Trip Cancellation:</strong> {policy.coverage.tripCancellation ? 'Yes' : 'No'}</Text>
          </div>

          <div>
            <Title order={3} mb="sm">Insurance Terms and Conditions</Title>
            <Text>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
              Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
              Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
              Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </Text>
            <Text mt="md">
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, 
              totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. 
              Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.
            </Text>
          </div>

          <div>
            <Title order={3} mb="sm">Consents</Title>
            <Text><strong>GDPR Consent:</strong> {policy.consents.gdpr ? 'Yes' : 'No'}</Text>
            <Text><strong>Terms Accepted:</strong> {policy.consents.terms ? 'Yes' : 'No'}</Text>
            <Text><strong>IPID Received:</strong> {policy.consents.ipid ? 'Yes' : 'No'}</Text>
            <Text><strong>Truthfulness Declaration:</strong> {policy.consents.truthfulness ? 'Yes' : 'No'}</Text>
            <Text><strong>Remote Agreement:</strong> {policy.consents.remote ? 'Yes' : 'No'}</Text>
            <Text size="sm" c="dimmed" mt="sm">
              Consented on: {new Date(policy.consents.timestamp).toLocaleString()}
            </Text>
          </div>
        </Stack>
      </Paper>
    </Container>
  )
}

export default function ContractPage() {
  return (
    <Suspense fallback={
      <Container size="md" py="xl">
        <Text>Loading...</Text>
      </Container>
    }>
      <ContractContent />
    </Suspense>
  )
}
