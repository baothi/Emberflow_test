export interface ContactType {
  _id: string
  name: string
  phoneNumber: string
  email: string
  createdAt: string
  updatedAt: string
}

export type ContactInputType = Omit<ContactType, '_id' | 'createdAt' | 'updatedAt'>
