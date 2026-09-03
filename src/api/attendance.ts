import apiClient from './client'

export interface AttendanceRecord {
  id: number
  user_id: number
  username?: string
  role_name?: string
  check_in_time: string
  check_out_time: string | null
  location_coordinates?: { latitude: number; longitude: number } | null
}

export interface AttendanceResponse {
  message: string
  attendance: AttendanceRecord
}

/**
 * Clock in with optional GPS coordinates
 */
export async function checkInApi(coordinates?: { latitude: number; longitude: number }): Promise<AttendanceResponse> {
  const response = await apiClient.post<AttendanceResponse>('/attendance/check-in', {
    location_coordinates: coordinates || null,
  })
  return response.data
}

/**
 * Clock out current active session
 */
export async function checkOutApi(): Promise<AttendanceResponse> {
  const response = await apiClient.post<AttendanceResponse>('/attendance/check-out')
  return response.data
}

/**
 * Get attendance records (history & active sessions)
 */
export async function getAttendanceHistoryApi(): Promise<{ attendances: AttendanceRecord[] }> {
  const response = await apiClient.get<{ attendances: AttendanceRecord[] }>('/attendance/history')
  return response.data
}
