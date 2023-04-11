import { createSlice } from '@reduxjs/toolkit';

const initialState = {
   tariffs: [],
   totalAdded: 0,
};

export const comparisonSlice = createSlice({
   name: 'comparison',
   initialState,
   reducers: {
      addTariff: (state, action) => {
         const searchCopy = state.tariffs.some((tarif) => tarif.id === action.payload.id);
         if (!searchCopy && state.tariffs.length <= 4) {
            state.tariffs.push(action.payload);
         } else {
            const filterTariffs = state.tariffs.filter((tarif) => tarif.id !== action.payload.id);
            state.tariffs = filterTariffs;
         }
         state.totalAdded = state.tariffs.length;
      },

      deleteTariff: (state, action) => {
         const filterTariffs = state.tariffs.filter((tarif) => tarif.id !== action.payload);
         state.tariffs = filterTariffs;
         state.totalAdded = state.tariffs.length;
      },
   },
});

export const { addTariff, deleteTariff } = comparisonSlice.actions;

export default comparisonSlice.reducer;
