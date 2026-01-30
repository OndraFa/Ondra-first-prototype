'use client'

import { Button, TextInput, Paper, Group, Select, NumberInput } from '@mantine/core'
import { useForm } from '@mantine/form'
import type { TripInfo } from '@/lib/types'

interface Step3TripProps {
  data?: Partial<TripInfo>
  onNext: (data: Partial<TripInfo>) => void
  onPrev: () => void
}

export function Step3Trip({ data, onNext, onPrev }: Step3TripProps) {
  const today = new Date().toISOString().split('T')[0]

  const form = useForm<Partial<TripInfo>>({
    initialValues: {
      destination: data?.destination || undefined,
      departureDate: data?.departureDate || '',
      returnDate: data?.returnDate || '',
      tripType: data?.tripType || 'one-time',
      adults: data?.adults || 1,
      children: data?.children || 0,
    },
    validate: {
      destination: (value) => (!value ? 'Destination is required' : null),
      departureDate: (value) => (!value ? 'Departure date is required' : null),
      returnDate: (value, values) => {
        if (!value) return 'Return date is required'
        if (values.departureDate && new Date(value) <= new Date(values.departureDate!)) {
          return 'Return date must be after departure date'
        }
        return null
      },
      adults: (value) => (!value || value < 1 ? 'At least 1 adult required' : null),
    },
  })

  const handleSubmit = (values: Partial<TripInfo>) => {
    onNext(values)
  }

  return (
    <Paper p="xl" withBorder>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Select
          label="Destination Region"
          placeholder="Select destination..."
          data={[
            { value: 'CZ', label: 'Czech Republic (CZK)' },
            { value: 'EU', label: 'Europe (EUR)' },
            { value: 'WORLD', label: 'Rest of World (USD)' },
          ]}
          required
          {...form.getInputProps('destination')}
          mb="md"
        />

        <TextInput
          label="Departure Date"
          type="date"
          min={today}
          required
          {...form.getInputProps('departureDate')}
          mb="md"
        />

        <TextInput
          label="Return Date"
          type="date"
          min={form.values.departureDate || today}
          required
          {...form.getInputProps('returnDate')}
          mb="md"
        />

        <Select
          label="Trip Type"
          data={[
            { value: 'one-time', label: 'One-time trip' },
            { value: 'repeated', label: 'Repeated trip' },
          ]}
          {...form.getInputProps('tripType')}
          mb="md"
        />

        <Group grow mb="xl">
          <NumberInput
            label="Adults"
            min={1}
            required
            {...form.getInputProps('adults')}
          />
          <NumberInput
            label="Children"
            min={0}
            {...form.getInputProps('children')}
          />
        </Group>

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
