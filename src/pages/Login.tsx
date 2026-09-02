import React, { useState } from 'react'
import { Boxes, Eye, EyeOff, Loader2, AlertCircle } from 'lucide-react'
import bgImage from '../assets/background-image-nibm.jpg'
import { useAuth } from '../context/AuthContext'
import axios from 'axios'

interface LoginProps {
  onLogin?: (credentials: { usernameOrEmail: string; password: string; rememberMe: boolean }) => void
}

export const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [usernameOrEmail, setUsernameOrEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const { login } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMessage(null)
    setIsSubmitting(true)

    try {
      await login({ usernameOrEmail, password })
      if (onLogin) {
        onLogin({ usernameOrEmail, password, rememberMe: false })
      }
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        const msg = err.response?.data?.message || err.response?.data?.error || 'Failed to sign in. Please verify your credentials.'
        // ADD THIS LINE to see the actual underlying error in your browser console (F12)
        console.error("Axios Error Details:", err.message, err.response?.data);
        setErrorMessage(msg)
      } else if (err instanceof Error) {
        setErrorMessage(err.message)
      } else {
        setErrorMessage('An unexpected error occurred. Please try again.')
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="relative min-h-screen w-full overflow-hidden flex items-center justify-center p-4 sm:p-6">
      
      {/* Background layer with subtle blur */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat blur-[3px] scale-105"
        style={{ backgroundImage: `url(${bgImage})` }}
      />

      {/* Reusable Liquid Glass Authentication Card */}
      <div className="glass-panel relative z-10 w-full mx-2 p-6 sm:w-[440px] sm:mx-0 sm:p-[42px] flex flex-col gap-6">
        
        {/* Specular liquid reflection highlight overlay */}
        <div className="glass-shine" />

        {/* Subtle internal glowing flare */}
        <div className="glass-flare" />

        {/* 1. Brand Logo & Header */}
        <div className="relative z-10 flex items-center justify-center gap-3 p-10">
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-[#6552D2] to-[#8675EC] flex items-center justify-center shadow-md shadow-[#6552D2]/30 text-white">
            <Boxes className="w-6 h-6 stroke-[2.2]" />
          </div>
          <span className="text-4xl font-bold tracking-tight text-text-main">
            Lab<span className="text-[#6552D2]">Structor</span>
          </span>
        </div>

        {/* Error notification banner */}
        {errorMessage && (
          <div className="relative z-10 glass-alert-error flex items-start gap-2.5">
            <AlertCircle className="w-5 h-5 flex-shrink-0 text-red-600 mt-0.5" />
            <span className="text-sm text-red-800 font-medium">{errorMessage}</span>
          </div>
        )}

        {/* 3. Form */}
        <form onSubmit={handleSubmit} className="relative z-10 flex flex-col gap-5">
          {/* Field 1: Username or Email */}
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="usernameOrEmail"
              className="text-xs font-semibold text-text-main/80 uppercase tracking-wider"
            >
              Username or Email
            </label>
            <input
              id="usernameOrEmail"
              type="text"
              required
              disabled={isSubmitting}
              value={usernameOrEmail}
              onChange={(e) => setUsernameOrEmail(e.target.value)}
              placeholder="instructor_jane or john@university.edu"
              className="glass-input h-[50px] sm:h-[48px] px-4"
            />
          </div>

          {/* Field 2: Password with Eye toggle */}
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="password"
              className="text-xs font-semibold text-text-main/80 uppercase tracking-wider"
            >
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                required
                disabled={isSubmitting}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="glass-input h-[50px] sm:h-[48px] pl-4 pr-11"
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-text-muted hover:text-[#6552D2] transition-colors p-1 cursor-pointer"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>

          {/* 5. Primary Action Button with Loading Spinner */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full h-[50px] sm:h-[48px] bg-[#6552D2] hover:bg-[#5442BE] disabled:opacity-75 disabled:cursor-not-allowed text-white font-semibold text-sm rounded-[14px] shadow-lg shadow-[#6552D2]/25 hover:shadow-xl hover:shadow-[#6552D2]/35 active:scale-[0.99] transition-all flex items-center justify-center cursor-pointer my-10 gap-2"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Signing in...</span>
              </>
            ) : (
              'Sign In'
            )}
          </button>
        </form>

      </div>
    </div>
  )
}

export default Login