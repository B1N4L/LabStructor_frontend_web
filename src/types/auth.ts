export interface User {
  id: number
  username: string
  email: string
  role_id: number
  role: string
  permissions: string[]
}

export interface LoginCredentials {
  usernameOrEmail: string
  password: string
}

export interface AuthResponse {
  message: string
  user: User
  token: string
}

export interface ApiError {
  error?: string
  message: string
}
