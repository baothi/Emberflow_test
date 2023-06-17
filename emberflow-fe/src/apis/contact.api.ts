import { ContactType, ContactInputType } from 'src/types/contact.type'
import http from 'src/utils/http'

export const createContact = (body: ContactInputType) => http.post<ContactType>('/contact/create', body)

export const getContact = (id: string) => http.get<ContactType>(`/contact/${id}`)

export const getAllContact = () => http.get<ContactType[]>('/contact/')

export const updateContact = (id: string, body: ContactInputType) => http.put<ContactType>(`/contact/${id}`, body)

export const deleteContact = (id: string) => http.delete<ContactType>(`/contact/${id}`)
