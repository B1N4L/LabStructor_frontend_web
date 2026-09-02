import React, { useState } from 'react'
import { Boxes, Eye, EyeOff } from 'lucide-react'
import { useMediaQuery } from 'react-responsive'

interface LoginProps {
  onLogin?: (credentials: { usernameOrEmail: string; password: string; rememberMe: boolean }) => void
}

export const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [usernameOrEmail, setUsernameOrEmail] = useState('')
  const [password, setPassword] = useState('')
  const [rememberMe, setRememberMe] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  // Detect mobile viewport using react-responsive (matching Tailwind's 'sm' breakpoint of 640px)
  const isMobile = useMediaQuery({ maxWidth: 639 })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (onLogin) {
      onLogin({ usernameOrEmail, password, rememberMe })
    } else {
      console.log('Login submitted:', { usernameOrEmail, password, rememberMe })
    }
  }

  return (
    <div className="min-h-screen w-full bg-background flex items-center justify-center p-0">
      {/* Authentication Card */}
      <div className="w-full mx-6 p-6 sm:w-[420px] sm:mx-0 sm:p-[40px] rounded-[16px] bg-white/85 backdrop-blur-md border border-white/60 shadow-glass flex flex-col gap-6">
        
        {/* 1. Brand Logo */}
        <div className="flex items-center justify-center gap-2.5">
          <Boxes className="w-7 h-7 text-primary stroke-[2.2]" />
          <span className="text-xl font-bold tracking-tight text-text-main">
            LabStructor
          </span>
        </div>

        {/* 2. Heading Section */}
        <div className="text-center flex flex-col gap-1">
          <h1 className="text-2xl font-semibold text-text-main">
            Sign In
          </h1>
          <p className="text-sm text-text-muted">
            Enter your university credentials to continue
          </p>
        </div>

        {/* 3. Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          {/* Field 1: Username or Email */}
          <div className="flex flex-col gap-1.5">
            <label 
              htmlFor="usernameOrEmail" 
              className="text-xs font-medium text-text-main uppercase tracking-wider"
            >
              Username or Email
            </label>
            <input
              id="usernameOrEmail"
              type="text"
              required
              value={usernameOrEmail}
              onChange={(e) => setUsernameOrEmail(e.target.value)}
              placeholder="instructor_jane or john@university.edu"
              className="w-full h-[50px] sm:h-[48px] px-4 bg-white border border-gray-200 rounded-[12px] text-text-main placeholder:text-text-muted text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
            />
          </div>

          {/* Field 2: Password with Eye toggle */}
          <div className="flex flex-col gap-1.5">
            <label 
              htmlFor="password" 
              className="text-xs font-medium text-text-main uppercase tracking-wider"
            >
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full h-[50px] sm:h-[48px] pl-4 pr-11 bg-white border border-gray-200 rounded-[12px] text-text-main placeholder:text-text-muted text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-main transition-colors p-1"
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

          {/* 4. Utility Row */}
          <div className="flex items-center justify-between text-sm pt-0.5">
            <label className="flex items-center gap-2 text-text-muted cursor-pointer select-none">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary/30 accent-primary cursor-pointer"
              />
              <span className="text-sm">Remember me</span>
            </label>

            <a
              href="#forgot-password"
              className="text-sm text-primary hover:underline font-medium"
            >
              Forgot password?
            </a>
          </div>

          {/* 5. Primary Action Button */}
          <button
            type="submit"
            className="w-full h-[50px] sm:h-[48px] bg-primary text-white font-bold text-sm rounded-[12px] shadow-sm hover:bg-primary/90 active:scale-[0.99] transition-all flex items-center justify-center cursor-pointer mt-1"
          >
            Sign In
          </button>
        </form>

        {/* 6. Subtext / Footer */}
        <div className="pt-2 text-center">
          <p className="text-xs text-text-muted">
            {isMobile
              ? 'LabStructor System • University Portal'
              : 'Access restricted to authorized Admin, Instructor, and Staff accounts.'}
          </p>
        </div>

      </div>
    </div>
  )
}

export default Login
