import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface UserProfile {
  id: string
  firstName: string
  lastName: string
  email: string
  avatar?: string
  role?: string
}

interface UserState {
  profile: UserProfile | null
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
    setProfile: (state, action: PayloadAction<UserProfile>) => {
      state.profile = action.payload
    },
    updatePreferences: (state, action: PayloadAction<Partial<UserState['preferences']>>) => {
      state.preferences = { ...state.preferences, ...action.payload }
    },
    clearProfile: (state) => {
      state.profile = null
    },
  },
})

export const { setProfile, updatePreferences, clearProfile } = userSlice.actions
export default userSlice.reducer