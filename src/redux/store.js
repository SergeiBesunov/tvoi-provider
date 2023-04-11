import { configureStore } from '@reduxjs/toolkit'

import filterReducer from './slices/filterSlice'
import tariffsSlice from './slices/tariffsSlice'
import tariffsByIdSlice from './slices/tariffsByIdSlice'
import comparisonSlice from './slices/comparisonSlice'
import modalSlices from './slices/modalSlices'
import connectionForms from './slices/connectionForms'


export const store = configureStore({
  reducer: {
    filters: filterReducer,
    tariffs: tariffsSlice,
    tariff: tariffsByIdSlice,
    comparison: comparisonSlice,
    modals: modalSlices,
    connectionForm: connectionForms
  }
})