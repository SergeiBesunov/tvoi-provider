import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    nameTariff: "",
    idTariff: "",
    selectedAddress: "",
}

export const connectionForms = createSlice({
  name: 'connections',
  initialState,
  reducers: {
    addTariffData: (state, action) => {
        state.idTariff = action.payload.id
        state.nameTariff = action.payload.name
    },

    addPlacoholderAddress: (state, action) => {
      state.selectedAddress = action.payload
    },
  },
})

export const {addTariffData, addPlacoholderAddress} = connectionForms.actions

export default connectionForms.reducer