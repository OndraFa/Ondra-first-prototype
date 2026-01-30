'use client'

import { useState } from 'react'
import { Button, Paper, Group, Radio, Stack, NumberInput, Alert } from '@mantine/core'
import { useForm } from '@mantine/form'
import { IconInfoCircle } from '@tabler/icons-react'
import type { HealthInfo } from '@/lib/types'

interface Step6HealthProps {
  data?: Partial<HealthInfo>
  onNext: (data: Partial<HealthInfo>) => void
  onPrev: () => void
}

export function Step6Health({ data, onNext, onPrev }: Step6HealthProps) {
  const [pregnancy, setPregnancy] = useState<'yes' | 'no'>(data?.pregnancy || 'no')

  const form = useForm<Partial<HealthInfo>>({
    initialValues: {
      chronicIllness: data?.chronicIllness || 'no',
      recentTreatment: data?.recentTreatment || 'no',
      pregnancy: pregnancy,
      pregnancyWeek: data?.pregnancyWeek,
    },
  })

  const handleSubmit = (values: Partial<HealthInfo>) => {
    onNext({ ...values, pregnancy })
  }

  return (
    <Paper p="xl" withBorder>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Text size="sm" c="dimmed" mb="lg">
          This information is required for accurate coverage assessment
        </Text>

        <Radio.Group
          label="Chronic Illness"
          {...form.getInputProps('chronicIllness')}
          mb="md"
        >
          <Stack gap="xs" mt="xs">
            <Radio value="no" label="No" />
            <Radio value="yes" label="Yes" />
          </Stack>
        </Radio.Group>

        <Radio.Group
          label="Medical Treatment in Last 6 Months"
          {...form.getInputProps('recentTreatment')}
          mb="md"
        >
          <Stack gap="xs" mt="xs">
            <Radio value="no" label="No" />
            <Radio value="yes" label="Yes" />
          </Stack>
        </Radio.Group>

        <Radio.Group
          label="Pregnancy"
          value={pregnancy}
          onChange={(value) => {
            setPregnancy(value as 'yes' | 'no')
            form.setFieldValue('pregnancy', value as 'yes' | 'no')
          }}
          mb="md"
        >
          <Stack gap="xs" mt="xs">
            <Radio value="no" label="No" />
            <Radio value="yes" label="Yes" />
          </Stack>
        </Radio.Group>

        {pregnancy === 'yes' && (
          <NumberInput
            label="Pregnancy Week"
            min={1}
            max={42}
            {...form.getInputProps('pregnancyWeek')}
            mb="xl"
          />
        )}

        <Alert icon={<IconInfoCircle size={16} />} title="GDPR Notice" color="blue" mb="xl">
          We only collect necessary health information for insurance assessment. Your data is processed in accordance with GDPR regulations.
        </Alert>

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
