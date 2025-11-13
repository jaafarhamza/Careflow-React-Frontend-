import { configureStore } from '@reduxjs/toolkit'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { combineReducers } from '@reduxjs/toolkit'

import authReducer from './slices/authSlice'
import userReducer from './slices/userSlice'
import uiReducer from './slices/uiSlice'

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth', 'user'],
}

const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  ui: uiReducer,
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
  devTools: import.meta.env.MODE !== 'production',
})

export const persistor = persistStore(store)
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch