import { useEffect, useState } from 'react'
import { Button, Modal, Table } from 'react-bootstrap'
import { createContact, deleteContact, getAllContact, updateContact } from 'src/apis/contact.api'
import { ContactType } from 'src/types/contact.type'
import ContactForm from './ContactForm'
import { toast } from 'react-toastify'

const Contact = () => {
  const [isOpenModal, setIsOpenModal] = useState(false)
  const [isOpenModalConfirm, setIsOpenModalConfirm] = useState(false)
  const [isEdit, setIsEdit] = useState(false)
  const [listContacts, setListContacts] = useState<ContactType[]>([])
  const [contactSelected, setContactSelected] = useState<ContactType | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleCloseModal = () => setIsOpenModal(false)
  const handleCloseModalConfirm = () => setIsOpenModalConfirm(false)

  const getContactAPI = async () => {
    const result = await getAllContact()
    setListContacts(result.data)
  }

  useEffect(() => {
    getContactAPI()
  }, [])

  const handleDeleteContact = async (id: string) => {
    try {
      await deleteContact(id)
      await getContactAPI()
      toast.success('Delete contact successfully!')
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error('Error with message: ', error.message)
    }
    setIsOpenModalConfirm(false)
  }

  const handleConfirmModal = async (values: { name: string; email: string; phoneNumber: string }) => {
    setIsLoading(true)
    try {
      if (isEdit && contactSelected?._id) {
        await updateContact(contactSelected._id, values)
        toast.success('Update contact successfully!')
      } else {
        await createContact(values)
        toast.success('Create contact successfully!')
      }

      setIsOpenModal(false)
      await getContactAPI()
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error('Error with message: ', error.message)
    }
    setIsLoading(false)
  }

  return (
    <div>
      <Button
        className='mb-3'
        onClick={() => {
          setIsOpenModal(true)
          setIsEdit(false)
          setContactSelected(null)
        }}
      >
        Create
      </Button>
      <Table striped bordered hover className='text-center' style={{ width: '80vw' }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Phone Number</th>
            <th>Email</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {listContacts.map((contact) => (
            <tr key={contact._id}>
              <td>{contact._id}</td>
              <td>{contact.name}</td>
              <td>{contact.phoneNumber}</td>
              <td>{contact.email}</td>
              <td className='text-center'>
                <Button
                  variant='warning'
                  className='mx-2'
                  onClick={() => {
                    setContactSelected(contact)
                    setIsOpenModal(true)
                    setIsEdit(true)
                  }}
                >
                  Edit
                </Button>
                <Button
                  onClick={() => {
                    setIsOpenModalConfirm(true)
                    setContactSelected(contact)
                  }}
                  variant='danger'
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Modal show={isOpenModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{isEdit ? 'Update Contact' : 'Add Contact'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ContactForm
            contactSelected={contactSelected}
            onSubmit={handleConfirmModal}
            onCloseModal={handleCloseModal}
            isLoading={isLoading}
          />
        </Modal.Body>
      </Modal>

      <Modal show={isOpenModalConfirm} onHide={handleCloseModalConfirm}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Contact</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Do you want to delete contact named <b>{contactSelected?.name}</b> ?
        </Modal.Body>
        <Modal.Footer>
          <Button className='m-2' variant='secondary' onClick={handleCloseModalConfirm}>
            Close
          </Button>

          <Button
            variant='primary'
            onClick={() => {
              if (contactSelected) {
                handleDeleteContact(contactSelected._id)
              }
            }}
          >
            {isLoading ? (
              <div className='spinner-border spinner-border-sm' role='status'>
                <span className='sr-only'></span>
              </div>
            ) : (
              ' Confirm'
            )}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default Contact
