'use client'

import { useState } from 'react'
import { Button, Paper, Group, Select, Radio, Stack } from '@mantine/core'
import { useForm } from '@mantine/form'
import type { TripType } from '@/lib/types'

interface Step4TripTypeProps {
  data?: Partial<TripType>
  onNext: (data: Partial<TripType>) => void
  onPrev: () => void
}

export function Step4TripType({ data, onNext, onPrev }: Step4TripTypeProps) {
  const [sportsActivities, setSportsActivities] = useState<'yes' | 'no'>(data?.sportsActivities || 'no')

  const form = useForm<Partial<TripType>>({
    initialValues: {
      purpose: data?.purpose || 'recreational',
      sportsActivities: sportsActivities,
      sportsType: data?.sportsType || 'recreational',
    },
  })

  const handleSubmit = (values: Partial<TripType>) => {
    onNext({ ...values, sportsActivities })
  }

  return (
    <Paper p="xl" withBorder>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Select
          label="Trip Purpose"
          data={[
            { value: 'recreational', label: 'Recreational/Tourist' },
            { value: 'business', label: 'Business Trip' },
            { value: 'study', label: 'Study/Au-pair' },
            { value: 'sports', label: 'Sports Stay' },
          ]}
          {...form.getInputProps('purpose')}
          mb="md"
        />

        <Radio.Group
          label="Sports Activities"
          value={sportsActivities}
          onChange={(value) => {
            setSportsActivities(value as 'yes' | 'no')
            form.setFieldValue('sportsActivities', value as 'yes' | 'no')
          }}
          mb="md"
        >
          <Stack gap="xs" mt="xs">
            <Radio value="no" label="No" />
            <Radio value="yes" label="Yes" />
          </Stack>
        </Radio.Group>

        {sportsActivities === 'yes' && (
          <Select
            label="Type of Sports Activities"
            data={[
              { value: 'recreational', label: 'Recreational' },
              { value: 'risky', label: 'Risky' },
              { value: 'extreme', label: 'Extreme' },
            ]}
            {...form.getInputProps('sportsType')}
            mb="xl"
          />
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
