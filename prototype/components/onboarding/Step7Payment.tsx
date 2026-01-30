'use client'

import { useState } from 'react'
import { Button, Paper, Group, Select, Textarea, Checkbox, Stack, FileButton, Image, Text, Alert } from '@mantine/core'
import { useForm } from '@mantine/form'
import { addPolicy } from '@/lib/utils/storage'
import type { Payment, Consents } from '@/lib/types'

interface Step7PaymentProps {
  data?: Partial<Payment>
  consents?: Partial<Consents>
  onPrev: () => void
  onSubmit: (payment: Partial<Payment>, consents: Partial<Consents>, idDocument: string) => void
  onIdUpload: (data: string) => void
}

export function Step7Payment({ data, consents, onPrev, onSubmit, onIdUpload }: Step7PaymentProps) {
  const [file, setFile] = useState<File | null>(null)
  const [filePreview, setFilePreview] = useState<string | null>(null)
  const [fileError, setFileError] = useState('')

  const form = useForm<Partial<Payment & Consents>>({
    initialValues: {
      paymentMethod: data?.paymentMethod || undefined,
      billingAddress: data?.billingAddress || '',
      gdpr: consents?.gdpr || false,
      terms: consents?.terms || false,
      ipid: consents?.ipid || false,
      truthfulness: consents?.truthfulness || false,
      remote: consents?.remote || false,
    },
    validate: {
      paymentMethod: (value) => (!value ? 'Payment method is required' : null),
      gdpr: (value) => (!value ? 'GDPR consent is required' : null),
      terms: (value) => (!value ? 'Terms consent is required' : null),
      ipid: (value) => (!value ? 'IPID consent is required' : null),
      truthfulness: (value) => (!value ? 'Truthfulness declaration is required' : null),
      remote: (value) => (!value ? 'Remote agreement consent is required' : null),
    },
  })

  const handleFileChange = (file: File | null) => {
    if (!file) return

    setFileError('')

    // Validate file size (2MB)
    if (file.size > 2 * 1024 * 1024) {
      setFileError('File size must be less than 2MB')
      return
    }

    // Validate file type
    if (!file.type.match('image/jpeg')) {
      setFileError('Only JPG files are allowed')
      return
    }

    setFile(file)

    // Create preview
    const reader = new FileReader()
    reader.onload = (e) => {
      const result = e.target?.result as string
      setFilePreview(result)
      onIdUpload(result)
    }
    reader.readAsDataURL(file)
  }

  const handleSubmit = async (values: Partial<Payment & Consents>) => {
    if (!file) {
      setFileError('Please upload your ID document')
      return
    }

    const paymentData: Partial<Payment> = {
      paymentMethod: values.paymentMethod as Payment['paymentMethod'],
      billingAddress: values.billingAddress,
    }

    const consentsData: Partial<Consents> = {
      gdpr: values.gdpr || false,
      terms: values.terms || false,
      ipid: values.ipid || false,
      truthfulness: values.truthfulness || false,
      remote: values.remote || false,
    }

    onSubmit(paymentData, consentsData, filePreview || '')
  }

  return (
    <Paper p="xl" withBorder>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Select
          label="Payment Method"
          placeholder="Select payment method..."
          data={[
            { value: 'card', label: 'Credit/Debit Card' },
            { value: 'transfer', label: 'Bank Transfer' },
            { value: 'apple', label: 'Apple Pay' },
            { value: 'google', label: 'Google Pay' },
          ]}
          required
          {...form.getInputProps('paymentMethod')}
          mb="md"
        />

        <Textarea
          label="Billing Address (if different)"
          placeholder="Leave empty if same as permanent address"
          rows={3}
          {...form.getInputProps('billingAddress')}
          mb="xl"
        />

        <Text fw={500} mb="sm">ID Document Upload</Text>
        <FileButton
          onChange={handleFileChange}
          accept="image/jpeg"
          capture="environment"
        >
          {(props) => (
            <Button {...props} mb="md" variant="light">
              {file ? 'Change File' : 'Upload ID Document'}
            </Button>
          )}
        </FileButton>

        {fileError && (
          <Text c="red" size="sm" mb="md">{fileError}</Text>
        )}

        {filePreview && (
          <Paper p="md" withBorder mb="xl">
            <Image src={filePreview} alt="ID Preview" mb="md" />
            <Button
              variant="light"
              color="red"
              size="xs"
              onClick={() => {
                setFile(null)
                setFilePreview(null)
                onIdUpload('')
              }}
            >
              Remove
            </Button>
          </Paper>
        )}

        <Text size="xs" c="dimmed" mb="xl">
          JPG format, max 2MB
        </Text>

        <Text fw={500} mb="md">Legal Consents</Text>
        <Stack gap="md" mb="xl">
          <Checkbox
            label="I consent to personal data processing (GDPR)"
            required
            {...form.getInputProps('gdpr', { type: 'checkbox' })}
          />
          <Checkbox
            label="I have read and agree to the insurance terms"
            required
            {...form.getInputProps('terms', { type: 'checkbox' })}
          />
          <Checkbox
            label="I have received the information document on insurance product (IPID)"
            required
            {...form.getInputProps('ipid', { type: 'checkbox' })}
          />
          <Checkbox
            label="I declare that all provided information is truthful"
            required
            {...form.getInputProps('truthfulness', { type: 'checkbox' })}
          />
          <Checkbox
            label="I consent to remote insurance agreement"
            required
            {...form.getInputProps('remote', { type: 'checkbox' })}
          />
        </Stack>

        <Group justify="space-between">
          <Button variant="default" onClick={onPrev}>
            ← Previous
          </Button>
          <Button type="submit">Submit Policy</Button>
        </Group>
      </form>
    </Paper>
  )
}
