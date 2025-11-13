import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

interface UiState {
  isLoading: boolean
  sidebarOpen: boolean
  notifications: Array<{
    id: string
    type: 'success' | 'error' | 'warning' | 'info'
    message: string
  }>
}

const initialState: UiState = {
  isLoading: false,
  sidebarOpen: true,
  notifications: [],
}

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload
    },
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen
    },
    addNotification: (state, action: PayloadAction<Omit<UiState['notifications'][0], 'id'>>) => {
      state.notifications.push({
        id: Date.now().toString(),
        ...action.payload,
      })
    },
    removeNotification: (state, action: PayloadAction<string>) => {
      state.notifications = state.notifications.filter(n => n.id !== action.payload)
    },
  },
})

export const { setLoading, toggleSidebar, addNotification, removeNotification } = uiSlice.actions
export default uiSlice.reducer