import { configureStore } from '@reduxjs/toolkit'

import gtm from '~/entities/gtm/models/gtm.slice'

export const store = configureStore({
  reducer: {
    gtm,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
