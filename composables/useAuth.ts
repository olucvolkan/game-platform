import type { User, AuthResponse, LoginCredentials, RegisterCredentials } from '~/types'

/**
 * Composable for user authentication.
 *
 * Manages user login, registration, logout, and token persistence.
 * Stores token in both cookie (for SSR) and localStorage (for client-side).
 */
export const useAuth = () => {
  const user = useState<User | null>('auth_user', () => null)
  const token = useState<string | null>('auth_token', () => null)
  const isAuthenticated = computed(() => !!token.value)
  const { apiBase } = useApi()

  /**
   * Initialize auth state from storage on client-side
   */
  const initAuth = () => {
    if (process.client) {
      const storedToken = localStorage.getItem('auth_token')
      const storedUser = localStorage.getItem('auth_user')

      if (storedToken && storedUser) {
        token.value = storedToken
        try {
          user.value = JSON.parse(storedUser)
        } catch (error) {
          console.error('Failed to parse stored user:', error)
          clearAuth()
        }
      }
    }
  }

  /**
   * Store auth data in storage
   */
  const storeAuth = (authToken: string, authUser: User) => {
    token.value = authToken
    user.value = authUser

    if (process.client) {
      localStorage.setItem('auth_token', authToken)
      localStorage.setItem('auth_user', JSON.stringify(authUser))
    }

    // Also set as cookie for SSR
    const tokenCookie = useCookie('auth_token', {
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: '/',
      sameSite: 'lax',
    })
    tokenCookie.value = authToken
  }

  /**
   * Clear auth data from storage
   */
  const clearAuth = () => {
    token.value = null
    user.value = null

    if (process.client) {
      localStorage.removeItem('auth_token')
      localStorage.removeItem('auth_user')
    }

    const tokenCookie = useCookie('auth_token')
    tokenCookie.value = null
  }

  /**
   * Login with email and password
   */
  const login = async (credentials: LoginCredentials): Promise<{ success: boolean; error?: string }> => {
    try {
      const response = await $fetch<AuthResponse>(`${apiBase}/login`, {
        method: 'POST',
        body: credentials,
      })

      storeAuth(response.token, response.user)

      return { success: true }
    } catch (error: any) {
      console.error('Login failed:', error)
      return {
        success: false,
        error: error?.data?.message || 'Login failed. Please check your credentials.',
      }
    }
  }

  /**
   * Register new user
   */
  const register = async (credentials: RegisterCredentials): Promise<{ success: boolean; error?: string }> => {
    try {
      const response = await $fetch<AuthResponse>(`${apiBase}/register`, {
        method: 'POST',
        body: credentials,
      })

      storeAuth(response.token, response.user)

      return { success: true }
    } catch (error: any) {
      console.error('Registration failed:', error)
      return {
        success: false,
        error: error?.data?.message || 'Registration failed. Please try again.',
      }
    }
  }

  /**
   * Logout current user
   */
  const logout = async (): Promise<void> => {
    try {
      if (token.value) {
        await $fetch(`${apiBase}/logout`, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token.value}`,
          },
        })
      }
    } catch (error) {
      console.error('Logout API call failed:', error)
    } finally {
      clearAuth()
    }
  }

  /**
   * Fetch current user data from API
   */
  const fetchUser = async (): Promise<{ success: boolean; error?: string }> => {
    if (!token.value) {
      return { success: false, error: 'No token available' }
    }

    try {
      const response = await $fetch<User>(`${apiBase}/user`, {
        headers: {
          Authorization: `Bearer ${token.value}`,
        },
      })

      user.value = response

      if (process.client) {
        localStorage.setItem('auth_user', JSON.stringify(response))
      }

      return { success: true }
    } catch (error: any) {
      console.error('Failed to fetch user:', error)
      clearAuth()
      return {
        success: false,
        error: error?.data?.message || 'Failed to fetch user data',
      }
    }
  }

  /**
   * Make authenticated API request
   */
  const authenticatedFetch = async <T>(url: string, options: any = {}): Promise<T> => {
    if (!token.value) {
      throw new Error('Not authenticated')
    }

    return await $fetch<T>(url, {
      ...options,
      headers: {
        ...options.headers,
        Authorization: `Bearer ${token.value}`,
      },
    })
  }

  // Initialize auth on composable creation (client-side only)
  if (process.client && !token.value) {
    initAuth()
  }

  return {
    user,
    token,
    isAuthenticated,
    login,
    register,
    logout,
    fetchUser,
    authenticatedFetch,
    initAuth,
  }
}
