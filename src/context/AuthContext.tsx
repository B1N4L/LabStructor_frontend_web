import React, { createContext, useContext, useState, useEffect } from 'react'
import type { User, LoginCredentials, AuthResponse } from '../types/auth'
import { loginApi, logoutApi, getMeApi } from '../api/auth'

interface AuthContextType {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (credentials: LoginCredentials) => Promise<AuthResponse>
  logout: () => void
  hasPermission: (permission: string) => boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem('labstructor_user')
    if (savedUser) {
      try {
        return JSON.parse(savedUser)
      } catch {
        return null
      }
    }
    return null
  })

  const [token, setToken] = useState<string | null>(() => {
    return localStorage.getItem('labstructor_token')
  })

  const [isLoading, setIsLoading] = useState<boolean>(true)

  // Verify token and refresh user on mount
  useEffect(() => {
    async function initAuth() {
      const storedToken = localStorage.getItem('labstructor_token')
      if (storedToken) {
        try {
          const { user: freshUser } = await getMeApi()
          setUser(freshUser)
          localStorage.setItem('labstructor_user', JSON.stringify(freshUser))
        } catch {
          // Token expired or invalid
          logout()
        }
      }
      setIsLoading(false)
    }

    initAuth()
  }, [])

  const login = async (credentials: LoginCredentials): Promise<AuthResponse> => {
    const data = await loginApi(credentials)
    setToken(data.token)
    setUser(data.user)
    localStorage.setItem('labstructor_token', data.token)
    localStorage.setItem('labstructor_user', JSON.stringify(data.user))
    return data
  }

  const logout = () => {
    logoutApi()
    setToken(null)
    setUser(null)
  }

  const hasPermission = (permission: string): boolean => {
    if (!user || !user.permissions) return false
    if (user.permissions.includes('*')) return true
    return user.permissions.includes(permission)
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!token && !!user,
        isLoading,
        login,
        logout,
        hasPermission,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export default AuthContext
