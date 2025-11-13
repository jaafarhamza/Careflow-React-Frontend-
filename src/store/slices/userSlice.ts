import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

interface UserState {
  profile: {
    id: string
    name: string
    email: string
    avatar?: string
  } | null
  preferences: {
    theme: 'light' | 'dark'
    language: string
  }
}

const initialState: UserState = {
  profile: null,
  preferences: {
    theme: 'light',
    language: 'en',
  },
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setProfile: (state, action: PayloadAction<UserState['profile']>) => {
      state.profile = action.payload
    },
    updatePreferences: (state, action: PayloadAction<Partial<UserState['preferences']>>) => {
      state.preferences = { ...state.preferences, ...action.payload }
    },
  },
})

export const { setProfile, updatePreferences } = userSlice.actions
export default userSlice.reducer