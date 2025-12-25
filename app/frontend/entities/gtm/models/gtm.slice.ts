import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import TagManager from 'react-gtm-module'

import { RegionsType } from '~/shared/types/regions'

export type Events =
  | 'get_started'
  | 'start_investing'
  | 'country_search'
  | 'search_clicks'
  | 'search_usage'
  | 'no_search_results'
  | 'search'
  | 'search_submit'
  | 'country_district_open'
  | 'city_stat_open'
  | 'country_sub_open'
  | 'b2b_es_book_demo_click'
  | 'b2b_es_explore_data'
  | 'b2b_es_fil_out_form'
  | 'b2b_es_reach_out'

export type DataLayerGTMPropsType = {
  Email: string
  Id: string
  Location: string
  country: RegionsType
  propName: string
  searchQuery: string
  suggestedOptions: string
  suggestedOption: string
  optionPosition: number
  city: string
  district: string
  subdistrict: string
  timestamp: string
  event: Events
}

export type GTMPropsType = {
  dataLayer: Partial<DataLayerGTMPropsType>
  gtmId: string
}

const initialState: GTMPropsType = {
  gtmId: 'GTM-P4TW4WFF',
  dataLayer: {
    Email: '',
    Location: '',
  },
}

export const gtmSlice = createSlice({
  name: 'gtm',
  initialState,
  reducers: {
    initGTM: (
      state,
      action: PayloadAction<{
        dataLayer: Partial<DataLayerGTMPropsType>
      }>
    ) => {
      const newGTMParams = { ...state.dataLayer, ...action.payload.dataLayer }

      state.dataLayer = newGTMParams

      TagManager.initialize({ gtmId: state.gtmId, dataLayer: newGTMParams })
    },
    updateGTMDataLayer: (state, action: PayloadAction<Partial<DataLayerGTMPropsType>>) => {
      state.dataLayer = {
        ...state.dataLayer,
        ...action.payload,
      }
    },
    pushToGTM: (
      state,
      action: PayloadAction<{
        dataLayer: Partial<DataLayerGTMPropsType>
        widthGlobalProps?: boolean
      }>
    ) => {
      const { widthGlobalProps = false } = action.payload
      const newGTMParams = {
        ...(widthGlobalProps
          ? {
              Email: state.dataLayer.Email,
              Location: state.dataLayer.Location,
              Id: state.dataLayer.Id,
            }
          : {}),
        ...action.payload.dataLayer,
      }
      TagManager.dataLayer({
        dataLayer: newGTMParams,
      })
      if (widthGlobalProps) {
        state.dataLayer = newGTMParams
      }
    },
  },
})

export const { pushToGTM, initGTM, updateGTMDataLayer } = gtmSlice.actions

export default gtmSlice.reducer
