import React, { useState, ChangeEvent, FormEvent } from 'react'
import { Form, Button } from 'react-bootstrap'
import { ContactType } from 'src/types/contact.type'

interface FormData {
  name: string
  email: string
  phoneNumber: string
}

interface ContactFormProps {
  onSubmit: (values: FormData) => void
  onCloseModal: () => void
  contactSelected: ContactType | null
  isLoading: boolean
}

const ContactForm: React.FC<ContactFormProps> = ({ onSubmit, onCloseModal, contactSelected, isLoading }) => {
  const defaultFormData: FormData = {
    name: contactSelected?.name || '',
    email: contactSelected?.email || '',
    phoneNumber: contactSelected?.phoneNumber || ''
  }

  const [formData, setFormData] = useState<FormData>(defaultFormData)
  const [validated, setValidated] = useState(false)

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }))
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    if (form.checkValidity()) {
      onSubmit(formData)
    }

    setValidated(true)
  }

  const handleCloseModal = () => {
    onCloseModal()
  }

  return (
    <Form noValidate validated={validated} onSubmit={handleSubmit}>
      <Form.Group controlId='formName'>
        <Form.Label>Name</Form.Label>
        <Form.Control required type='text' name='name' value={formData.name} onChange={handleChange} />
        <Form.Control.Feedback type='invalid'>Please enter your name.</Form.Control.Feedback>
      </Form.Group>

      <Form.Group controlId='formEmail' className='mt-2'>
        <Form.Label>Email</Form.Label>
        <Form.Control required type='email' name='email' value={formData.email} onChange={handleChange} />
        <Form.Control.Feedback type='invalid'>Please enter a valid email address.</Form.Control.Feedback>
      </Form.Group>

      <Form.Group controlId='formPhoneNumber' className='mt-2'>
        <Form.Label>Phone Number</Form.Label>
        <Form.Control
          required
          type='text'
          name='phoneNumber'
          pattern='\d{10}'
          value={formData.phoneNumber}
          onChange={handleChange}
        />
        <Form.Control.Feedback type='invalid'>Please enter a valid phone number.</Form.Control.Feedback>
      </Form.Group>

      <div className='d-flex justify-content-end align-items-center mt-2'>
        <Button className='m-2' variant='secondary' onClick={handleCloseModal}>
          Close
        </Button>

        <Button type='submit' variant='primary'>
          {isLoading ? (
            <div className='spinner-border spinner-border-sm' role='status'>
              <span className='sr-only'></span>
            </div>
          ) : (
            ' Confirm'
          )}
        </Button>
      </div>
    </Form>
  )
}

export default ContactForm
