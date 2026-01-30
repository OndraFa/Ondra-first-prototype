'use client'

import { useState } from 'react'
import { Button, TextInput, Paper, Group, Textarea, Radio, Stack } from '@mantine/core'
import { useForm } from '@mantine/form'
import type { PersonalInfo } from '@/lib/types'

interface Step2PersonalProps {
  data?: Partial<PersonalInfo>
  onNext: (data: Partial<PersonalInfo>) => void
  onPrev: () => void
}

export function Step2Personal({ data, onNext, onPrev }: Step2PersonalProps) {
  const [idType, setIdType] = useState<'czechId' | 'birthDate'>(data?.idType || 'czechId')

  const form = useForm<Partial<PersonalInfo>>({
    initialValues: {
      firstName: data?.firstName || '',
      lastName: data?.lastName || '',
      personalId: data?.personalId || '',
      birthDate: data?.birthDate || '',
      nationality: data?.nationality || '',
      address: data?.address || '',
      idType: idType,
    },
    validate: {
      personalId: (value, values) => {
        if (values.idType === 'czechId' && !value) {
          return 'Personal ID is required'
        }
        if (values.idType === 'czechId' && value && !/^[0-9]{6}\/[0-9]{4}$/.test(value)) {
          return 'Format: 123456/7890'
        }
        return null
      },
      birthDate: (value, values) => {
        if (values.idType === 'birthDate' && !value) {
          return 'Date of birth is required'
        }
        return null
      },
    },
  })

  const handleIdTypeChange = (value: 'czechId' | 'birthDate') => {
    setIdType(value)
    form.setFieldValue('idType', value)
    form.setFieldValue('personalId', '')
    form.setFieldValue('birthDate', '')
  }

  const handleSubmit = (values: Partial<PersonalInfo>) => {
    onNext({ ...values, idType })
  }

  return (
    <Paper p="xl" withBorder>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <TextInput
          label="First Name"
          placeholder="John"
          {...form.getInputProps('firstName')}
          mb="md"
        />

        <TextInput
          label="Last Name"
          placeholder="Doe"
          {...form.getInputProps('lastName')}
          mb="md"
        />

        <Radio.Group
          label="Identification"
          value={idType}
          onChange={(value) => handleIdTypeChange(value as 'czechId' | 'birthDate')}
          mb="md"
        >
          <Stack gap="xs" mt="xs">
            <Radio value="czechId" label="Czech Personal ID" />
            <Radio value="birthDate" label="Date of Birth" />
          </Stack>
        </Radio.Group>

        {idType === 'czechId' && (
          <TextInput
            label="Personal ID Number (Rodné číslo)"
            placeholder="123456/7890"
            {...form.getInputProps('personalId')}
            mb="md"
          />
        )}

        {idType === 'birthDate' && (
          <TextInput
            label="Date of Birth"
            type="date"
            {...form.getInputProps('birthDate')}
            mb="md"
          />
        )}

        <TextInput
          label="Nationality"
          placeholder="Czech"
          {...form.getInputProps('nationality')}
          mb="md"
        />

        <Textarea
          label="Permanent Address"
          placeholder="Street, City, Postal Code, Country"
          rows={3}
          {...form.getInputProps('address')}
          mb="xl"
        />

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
