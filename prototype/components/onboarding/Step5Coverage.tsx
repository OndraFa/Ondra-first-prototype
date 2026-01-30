'use client'

import { useEffect, useState } from 'react'
import { Button, Paper, Group, Select, Checkbox, Stack, Text, Title } from '@mantine/core'
import { useForm } from '@mantine/form'
import type { Coverage, TripInfo } from '@/lib/types'

interface Step5CoverageProps {
  data?: Partial<Coverage>
  tripInfo?: Partial<TripInfo>
  onNext: (data: Partial<Coverage>) => void
  onPrev: () => void
}

export function Step5Coverage({ data, tripInfo, onNext, onPrev }: Step5CoverageProps) {
  const [premium, setPremium] = useState<{ amount: string; currency: string } | null>(null)

  const form = useForm<Partial<Coverage>>({
    initialValues: {
      medicalLimit: data?.medicalLimit || '',
      accidentInsurance: data?.accidentInsurance || false,
      baggageInsurance: data?.baggageInsurance || false,
      liabilityInsurance: data?.liabilityInsurance || false,
      tripCancellation: data?.tripCancellation || false,
      assistanceServices: data?.assistanceServices ?? true,
      carAssistance: data?.carAssistance || false,
      pets: data?.pets || false,
      covid: data?.covid || false,
    },
    validate: {
      medicalLimit: (value) => (!value ? 'Medical limit is required' : null),
    },
  })

  // Calculate premium
  useEffect(() => {
    const destination = tripInfo?.destination
    const departureDate = tripInfo?.departureDate
    const returnDate = tripInfo?.returnDate
    const adults = tripInfo?.adults || 1
    const children = tripInfo?.children || 0
    const medicalLimit = form.values.medicalLimit

    if (!destination || !departureDate || !returnDate || !medicalLimit) {
      setPremium(null)
      return
    }

    const days = Math.ceil(
      (new Date(returnDate).getTime() - new Date(departureDate).getTime()) / (1000 * 60 * 60 * 24)
    )

    if (days <= 0) {
      setPremium(null)
      return
    }

    const baseRates = {
      CZ: { adult: 50, child: 30, currency: 'CZK' },
      EU: { adult: 2, child: 1.5, currency: 'EUR' },
      WORLD: { adult: 3, child: 2, currency: 'USD' },
    }

    const rates = baseRates[destination as keyof typeof baseRates]
    if (!rates) return

    let calculatedPremium = (adults * rates.adult + children * rates.child) * days

    const limitMultipliers: Record<string, number> = {
      '50000': 1.0,
      '100000': 1.3,
      '200000': 1.6,
    }

    calculatedPremium *= limitMultipliers[medicalLimit] || 1.0

    setPremium({
      amount: calculatedPremium.toFixed(2),
      currency: rates.currency,
    })
  }, [tripInfo, form.values.medicalLimit])

  const handleSubmit = (values: Partial<Coverage>) => {
    onNext(values)
  }

  const currencyMap: Record<string, string> = {
    CZ: 'CZK',
    EU: 'EUR',
    WORLD: 'USD',
  }

  return (
    <Paper p="xl" withBorder>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Select
          label="Medical Expenses Limit"
          placeholder="Select limit..."
          data={[
            { value: '50000', label: '50,000' },
            { value: '100000', label: '100,000' },
            { value: '200000', label: '200,000' },
          ]}
          required
          {...form.getInputProps('medicalLimit')}
          mb="md"
        />
        <Text size="xs" c="dimmed" mb="xl">
          Amount in {tripInfo?.destination ? currencyMap[tripInfo.destination] : ''}
        </Text>

        <Stack gap="md" mb="xl">
          <Checkbox
            label="Accident Insurance (death, permanent consequences)"
            {...form.getInputProps('accidentInsurance', { type: 'checkbox' })}
          />
          <Checkbox
            label="Baggage Insurance"
            {...form.getInputProps('baggageInsurance', { type: 'checkbox' })}
          />
          <Checkbox
            label="Liability Insurance"
            {...form.getInputProps('liabilityInsurance', { type: 'checkbox' })}
          />
          <Checkbox
            label="Trip Cancellation"
            {...form.getInputProps('tripCancellation', { type: 'checkbox' })}
          />
          <Checkbox
            label="Assistance Services"
            {...form.getInputProps('assistanceServices', { type: 'checkbox' })}
          />
        </Stack>

        <Text fw={500} mb="sm">Additional Coverage</Text>
        <Stack gap="md" mb="xl">
          <Checkbox
            label="Car Assistance"
            {...form.getInputProps('carAssistance', { type: 'checkbox' })}
          />
          <Checkbox
            label="Pets"
            {...form.getInputProps('pets', { type: 'checkbox' })}
          />
          <Checkbox
            label="COVID Coverage"
            {...form.getInputProps('covid', { type: 'checkbox' })}
          />
        </Stack>

        {premium && (
          <Paper p="md" withBorder mb="xl" style={{ backgroundColor: '#f5f7fa' }}>
            <Title order={4} mb="xs">Estimated Premium</Title>
            <Text size="xl" fw={700} c="blue">
              {premium.amount} {premium.currency}
            </Text>
            <Text size="xs" c="dimmed">
              Price calculated based on your selections
            </Text>
          </Paper>
        )}

        <Group justify="space-between">
          <Button variant="default" onClick={onPrev}>
            ← Previous
          </Button>
          <Button type="submit">Next →</Button>
        </Group>
      </form>
    </Paper>
  )
}
