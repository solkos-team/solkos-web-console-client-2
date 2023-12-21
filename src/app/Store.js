import { configureStore } from '@reduxjs/toolkit'


import works from './works'

export const store = configureStore({
  reducer: {    
    works : works
  },
})
