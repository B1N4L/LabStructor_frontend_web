import apiClient from './client'
import type { LoginCredentials, AuthResponse, User } from '../types/auth'

/**
 * Login with username or email and password
 */
export async function loginApi(credentials: LoginCredentials): Promise<AuthResponse> {
  const response = await apiClient.post<AuthResponse>('/auth/login', credentials)
  return response.data
}

/**
 * Fetch currently authenticated user profile & permissions
 */
export async function getMeApi(): Promise<{ user: User }> {
  const response = await apiClient.get<{ user: User }>('/auth/me')
  return response.data
}

/**
 * Clear local authentication storage
 */
export function logoutApi(): void {
  localStorage.removeItem('labstructor_token')
  localStorage.removeItem('labstructor_user')
}
