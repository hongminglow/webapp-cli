import { z } from 'zod'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001'

// Zod schemas for validation
const UserSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string().email(),
})

const ApiResponseSchema = z.object({
  success: z.boolean(),
  data: z.any().optional(),
  message: z.string().optional(),
})

export type User = z.infer<typeof UserSchema>
export type ApiResponse<T = any> = z.infer<typeof ApiResponseSchema> & { data?: T }

class ApiService {
  private async request<T>(endpoint: string, options?: RequestInit): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`
    
    const defaultOptions: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
      },
    }

    const response = await fetch(url, { ...defaultOptions, ...options })

    if (!response.ok) {
      throw new Error(`API Error: ${response.statusText}`)
    }

    const data = await response.json()
    return data
  }

  // User endpoints
  async getUsers(): Promise<User[]> {
    const response = await this.request<ApiResponse<User[]>>('/users')
    return UserSchema.array().parse(response.data)
  }

  async getUser(id: string): Promise<User> {
    const response = await this.request<ApiResponse<User>>(`/users/${id}`)
    return UserSchema.parse(response.data)
  }

  async createUser(userData: Omit<User, 'id'>): Promise<User> {
    const response = await this.request<ApiResponse<User>>('/users', {
      method: 'POST',
      body: JSON.stringify(userData),
    })
    return UserSchema.parse(response.data)
  }

  async updateUser(id: string, userData: Partial<User>): Promise<User> {
    const response = await this.request<ApiResponse<User>>(`/users/${id}`, {
      method: 'PUT',
      body: JSON.stringify(userData),
    })
    return UserSchema.parse(response.data)
  }

  async deleteUser(id: string): Promise<void> {
    await this.request(`/users/${id}`, {
      method: 'DELETE',
    })
  }
}

export const apiService = new ApiService()