import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

interface User {
  id: string
  firstName: string
  lastName: string
  email: string
  role?: string
}

interface AuthState {
  isAuthenticated: boolean
  accessToken: string | null
  refreshToken: string | null
  user: User | null
}

const initialState: AuthState = {
  isAuthenticated: false,
  accessToken: null,
  refreshToken: null,
  user: null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{
        accessToken: string
        refreshToken?: string
        user: User
      }>
    ) => {
      state.isAuthenticated = true
      state.accessToken = action.payload.accessToken
      state.refreshToken = action.payload.refreshToken || null
      state.user = action.payload.user
    },
    logout: (state) => {
      state.isAuthenticated = false
      state.accessToken = null
      state.refreshToken = null
      state.user = null
    },
    updateToken: (state, action: PayloadAction<string>) => {
      state.accessToken = action.payload
    },
  },
})

export const { setCredentials, logout, updateToken } = authSlice.actions
export default authSlice.reducer