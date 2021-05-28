import { configureStore } from '@reduxjs/toolkit'
import users from './redux/userSlice'

export const store = configureStore({
  reducer: {
    users
  }
})
