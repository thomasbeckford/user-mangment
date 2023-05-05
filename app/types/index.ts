export type UserProps = {
  id: number
  name: string
  email: string
  image: string
  createdAt?: string
}

export type CreateUserProps = {
  name: string
  email: string
  image?: string
}
