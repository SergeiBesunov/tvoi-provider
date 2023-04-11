import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import URL from '../../options/basicUrl';

const initialState = {
   statusLoading: 'pending',
   tariffs: [],
   tariffsPopular: [],
   error: '',
};

export const fetchTariffs = createAsyncThunk('tariffs/fetchTariffs', async (params, thunkAPI) => {
   const { geo, selectTariffs, selectProvider, price, freeConnection, promo, hd, sortBy, order } =
      params;

   try {
      const response = await fetch(
         `${URL}tariffs?geo_id=${geo}${selectTariffs}${selectProvider}${price}${freeConnection}${promo}${hd}${sortBy}${order}`,
      );

      if (!response.ok) {
         throw new Error(`Что то пошло не так :(`);
      }
      const data = await response.json();

      return data;
   } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
   }
});

export const fetchTariffsPopular = createAsyncThunk('tariffs/fetchTariffsPopular', async (id, thunkAPI) => {
      
      try {
         const response = await fetch(`${URL}tariffs?geo_id=${id}&_sort=rating&have_promo=1&_limit=4`);

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





export const tariffsSlice = createSlice({
   name: 'tariffs',
   initialState,
   reducers: {
      setTariffs: (state, action) => {
         state.tariffs = action.payload;
      },
   },

   extraReducers: (builder) => {
      builder
         .addCase(fetchTariffsPopular.fulfilled, (state, action) => {
            state.tariffsPopular = action.payload;
         })
         .addCase(fetchTariffsPopular.rejected, (state) => {
            state.tariffsPopular = [1,2,3,4];
         })
         .addCase(fetchTariffs.pending, (state) => {
            state.statusLoading = 'pending';
            state.tariffs = [];
         })
         .addCase(fetchTariffs.fulfilled, (state, action) => {
            state.statusLoading = 'sucsess';
            state.tariffs = action.payload;
            state.error = '';
         })
         .addCase(fetchTariffs.rejected, (state, action) => {
            state.statusLoading = 'fail';
            state.tariffs = [];
            state.error = action.payload;
         })
   },
});

export const { setTariffs } = tariffsSlice.actions;

export default tariffsSlice.reducer;
