'use client'

export const dynamic = 'force-dynamic'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Container, Title, Button, Paper, Text, Group, Badge, Stack } from '@mantine/core'
import { isLoggedIn, getCurrentUser, logout, getPolicies } from '@/lib/utils/storage'
import type { Policy } from '@/lib/types'

export default function DashboardPage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [policies, setPolicies] = useState<Policy[]>([])

  useEffect(() => {
    if (!isLoggedIn()) {
      router.push('/login')
      return
    }

    const currentUser = getCurrentUser()
    setUser(currentUser)
    setPolicies(getPolicies())
  }, [router])

  const handleLogout = () => {
    logout()
    router.push('/login')
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'green'
      case 'cancelled':
        return 'red'
      case 'expired':
        return 'yellow'
      default:
        return 'gray'
    }
  }

  if (!user) {
    return <div>Loading...</div>
  }

  return (
    <Container size="lg" py="xl">
      <Group justify="space-between" mb="xl">
        <div>
          <Title order={1}>My Policies</Title>
          <Text c="dimmed">Welcome back, {user.username || user.email}!</Text>
        </div>
        <Group>
          <Text size="sm" c="dimmed">{user.email}</Text>
          <Button variant="light" onClick={handleLogout}>
            Logout
          </Button>
        </Group>
      </Group>

      <Button mb="xl" onClick={() => router.push('/onboarding')}>
        + Create New Policy
      </Button>

      {policies.length === 0 ? (
        <Paper p="xl" ta="center">
          <Title order={2} mb="md">No policies yet</Title>
          <Text c="dimmed" mb="lg">
            Create your first travel insurance policy to get started.
          </Text>
          <Button onClick={() => router.push('/onboarding')}>
            Create Policy
          </Button>
        </Paper>
      ) : (
        <Stack gap="md">
          {policies.map((policy) => (
            <Paper key={policy.id} p="md" withBorder>
              <Group justify="space-between" mb="sm">
                <Title order={3}>{policy.id}</Title>
                <Badge color={getStatusColor(policy.status)}>
                  {policy.status}
                </Badge>
              </Group>
              <Text size="sm" c="dimmed">
                <strong>Insured:</strong>{' '}
                {policy.personalInfo.firstName} {policy.personalInfo.lastName}
              </Text>
              <Text size="sm" c="dimmed">
                <strong>Destination:</strong> {policy.tripInfo.destination}
              </Text>
              <Text size="sm" c="dimmed">
                <strong>Departure:</strong>{' '}
                {new Date(policy.tripInfo.departureDate).toLocaleDateString()}
              </Text>
              <Text size="sm" c="dimmed">
                <strong>Created:</strong>{' '}
                {new Date(policy.createdAt).toLocaleDateString()}
              </Text>
              <Group mt="md">
                <Button
                  variant="light"
                  size="xs"
                  onClick={() => router.push(`/contract?id=${policy.id}`)}
                >
                  View
                </Button>
                {policy.status === 'active' && (
                  <>
                    <Button
                      variant="light"
                      size="xs"
                      onClick={() => router.push(`/onboarding?edit=${policy.id}`)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="light"
                      color="red"
                      size="xs"
                      onClick={() => {
                        if (confirm('Are you sure you want to cancel this policy?')) {
                          // Cancel logic will be implemented
                          router.refresh()
                        }
                      }}
                    >
                      Cancel
                    </Button>
                  </>
                )}
              </Group>
            </Paper>
          ))}
        </Stack>
      )}
    </Container>
  )
}
