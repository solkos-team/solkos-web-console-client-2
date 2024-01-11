import { configureStore } from '@reduxjs/toolkit'


import works from './works'
import organization from './organization'
export const store = configureStore({
  reducer: {    
    works : works,
    organization:organization
  },
})
