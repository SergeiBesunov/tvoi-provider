import URL from '../../options/basicUrl';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
   statusLoading: 'pending',
   tariff: {},
   error: '',

};

export const fetchTariffsById = createAsyncThunk('tariff/fetchTariffsById', async (id, thunkAPI) => {
      
   try {
      const response = await fetch(`${URL}tariffs/${id}`);

      if (!response.ok) {
         throw new Error(`Что то пошло не так :(`);
      }
      const data = await response.json();
      return data;
   } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
   }
},
);


export const tariffByIdSlice = createSlice({
   name: 'tariff',
   initialState,
   extraReducers: (builder) => {
      builder
         .addCase(fetchTariffsById.pending, (state) => {
            state.statusLoading = 'pending';
            state.tariff = {};
         })
         .addCase(fetchTariffsById.fulfilled, (state, action) => {
            state.statusLoading = 'sucsess';
            state.tariff = action.payload;
            state.error = '';
         })
         .addCase(fetchTariffsById.rejected, (state, action) => {
            state.statusLoading = 'fail';
            state.tariff = {};
            state.error = action.payload;
         })
   },
});

export default tariffByIdSlice.reducer;
