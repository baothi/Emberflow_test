import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'

interface InputProps {
  onSubmit: (name: string) => void
}

const Input: React.FC<InputProps> = ({ onSubmit }) => {
  const [name, setName] = useState('')

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    onSubmit(name)
    setName('')
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId='name'>
        <Form.Label>Name:</Form.Label>
        <Form.Control type='text' value={name} onChange={(e) => setName(e.target.value)} />
      </Form.Group>
      <Button variant='primary' type='submit'>
        Submit
      </Button>
    </Form>
  )
}

export default Input
