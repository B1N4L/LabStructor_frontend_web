import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './context/AuthContext'
import ProtectedRoute from './components/common/ProtectedRoute'
import AppLayout from './components/layout/AppLayout'

import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Halls from './pages/Halls'
import Laptops from './pages/Laptops'
import Keys from './pages/Keys'
import UsersPage from './pages/Users'
import Profile from './pages/Profile'

function LoginRoute() {
  const { isAuthenticated, isLoading } = useAuth()
  if (!isLoading && isAuthenticated) {
    return <Navigate to="/dashboard" replace />
  }
  return <Login />
}

export function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Login Route */}
          <Route path="/login" element={<LoginRoute />} />

          {/* Protected Application Routes */}
          <Route
            element={
              <ProtectedRoute>
                <AppLayout />
              </ProtectedRoute>
            }
          >
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/halls" element={<Halls />} />
            <Route path="/laptops" element={<Laptops />} />
            <Route path="/keys" element={<Keys />} />
            <Route path="/users" element={<UsersPage />} />
            <Route path="/profile" element={<Profile />} />
          </Route>

          {/* Catch-all redirect */}
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
