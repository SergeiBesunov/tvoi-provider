import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    activeModalForm: false,
    activeModalPolicy: false
}

export const modalsSlice = createSlice({
  name: 'modals',
  initialState,
  reducers: {
    toggleModalForm: (state, action) => {
      if(action.payload === false){
        state.activeModalForm = false
      }else{
        state.activeModalForm = true
      }
    },

    toggleModalPolicy: (state, action) => {
      if(action.payload === false){
        state.activeModalPolicy = false
      }else{
        state.activeModalPolicy = true
      }
    },
  },
})

export const { toggleModalForm, toggleModalPolicy } = modalsSlice.actions

export default modalsSlice.reducer