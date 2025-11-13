import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

interface AuthState {
  isAuthenticated: boolean
  token: string | null
  user: { id: string; name: string; email: string } | null
}

const initialState: AuthState = {
  isAuthenticated: false,
  token: null,
  user: null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<{ token: string; user: AuthState['user'] }>) => {
      state.isAuthenticated = true
      state.token = action.payload.token
      state.user = action.payload.user
    },
    logout: (state) => {
      state.isAuthenticated = false
      state.token = null
      state.user = null
    },
  },
})

export const { login, logout } = authSlice.actions
export default authSlice.reducer