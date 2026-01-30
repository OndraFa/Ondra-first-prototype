'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button, TextInput, Checkbox, Container, Title, Text, Paper } from '@mantine/core'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [rememberMe, setRememberMe] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    // Demo credentials
    const isValidEmail = email.toLowerCase() === 'demo@example.com' || email.toLowerCase() === 'demo'
    const isValidPassword = password === 'demo123'

    if ((isValidEmail) && isValidPassword) {
      // Store in localStorage
      const userData = {
        email: 'demo@example.com',
        username: 'demo',
        loggedIn: true,
        loginTime: new Date().toISOString(),
        rememberMe: rememberMe
      }
      
      localStorage.setItem('user', JSON.stringify(userData))
      if (rememberMe) {
        sessionStorage.setItem('user', JSON.stringify(userData))
      }
      
      router.push('/dashboard')
    } else {
      setError('Invalid email/username or password')
    }
  }

  return (
    <Container size="xs" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Paper shadow="md" p="xl" style={{ width: '100%' }}>
        <Title order={1} ta="center" mb="md">
          Travel Insurance Broker
        </Title>
        <Text ta="center" c="dimmed" mb="xl">
          Please sign in to access your client zone
        </Text>

        <form onSubmit={handleSubmit}>
          <TextInput
            label="Email or Username"
            placeholder="demo@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            mb="md"
          />

          <TextInput
            label="Password"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            mb="md"
          />

          <Checkbox
            label="Remember me"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.currentTarget.checked)}
            mb="md"
          />

          {error && (
            <Text c="red" size="sm" mb="md">
              {error}
            </Text>
          )}

          <Button type="submit" fullWidth>
            Sign In
          </Button>

          <Text size="sm" c="dimmed" ta="center" mt="xl">
            <strong>Demo Credentials:</strong><br />
            Email: <code>demo@example.com</code><br />
            Password: <code>demo123</code>
          </Text>
        </form>
      </Paper>
    </Container>
  )
}
