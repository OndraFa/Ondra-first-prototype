'use client'

import { useState } from 'react'
import { Button, TextInput, Paper, Group, Text } from '@mantine/core'
import { useForm } from '@mantine/form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

const contactSchema = z.object({
  email: z.string().email('Invalid email address'),
  phone: z.string().regex(/^\+\d{1,3}\s\d{3}\s\d{3}\s\d{3}$/, 'Format: +420 123 456 789'),
})

type ContactData = z.infer<typeof contactSchema>

interface Step1ContactProps {
  data?: Partial<ContactData>
  onNext: (data: ContactData) => void
}

export function Step1Contact({ data, onNext }: Step1ContactProps) {
  const form = useForm<ContactData>({
    initialValues: {
      email: data?.email || '',
      phone: data?.phone || '',
    },
    validate: {
      email: (value) => (!value ? 'Email is required' : !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? 'Invalid email' : null),
      phone: (value) => {
        if (!value) return 'Phone is required'
        if (!/^\+\d{1,3}\s\d{3}\s\d{3}\s\d{3}$/.test(value)) {
          return 'Format: +420 123 456 789'
        }
        return null
      },
    },
  })

  const handleSubmit = (values: ContactData) => {
    onNext(values)
  }

  return (
    <Paper p="xl" withBorder>
      <Text size="sm" c="dimmed" mb="lg">
        We need your contact details to proceed
      </Text>

      <form onSubmit={form.onSubmit(handleSubmit)}>
        <TextInput
          label="Email Address"
          placeholder="your.email@example.com"
          required
          {...form.getInputProps('email')}
          mb="md"
        />

        <TextInput
          label="Phone Number"
          placeholder="+420 123 456 789"
          required
          {...form.getInputProps('phone')}
          mb="xl"
        />
        <Text size="xs" c="dimmed" mb="md">
          International format: +420 123 456 789
        </Text>

        <Group justify="flex-end">
          <Button type="submit">Next →</Button>
        </Group>
      </form>
    </Paper>
  )
}
