export type UserProps = {
  id: number
  name: string
  email: string
  image: string
  createdAt?: string
}

export type MutateUserProps = {
  id: number | undefined
  name: string
  email: string
  image: string | null
}
