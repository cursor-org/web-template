import { PayloadAction, createSlice } from '@reduxjs/toolkit'

export const THEME_KEY = 'theme'

export const commonSlice = createSlice({
  name: 'common',
  initialState: {
    isLanding: true,
    isEntryAppPage: true,
    activePage: '',
  },
  reducers: {
    setActiveComponent: (
      state,
      action: PayloadAction<{
        page: string
        isLanding: boolean
        isEntryAppPage: boolean
      }>
    ) => {
      state.activePage = action.payload.page
      state.isLanding = action.payload.isLanding
      state.isEntryAppPage = action.payload.isEntryAppPage
    },
  },
})

export const { setActiveComponent } = commonSlice.actions

export default commonSlice.reducer
