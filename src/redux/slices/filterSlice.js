import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    geo_id:{id: "63",name: "Самара"},
    categories: [],
    providers: [],
    price:{
        minPrice:149,
        maxPrice:1240
    },
    free_connection:"",
    have_promo:"",
    have_hd:"",
    sort: "rating"
}

export const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {

    changeState: (state, action) => {
        if(action.payload.name === "categories" || action.payload.name === "providers"){
            const check = state[action.payload.name].some((item)=>item === action.payload.id)
            if(!check){
             state[action.payload.name].push(action.payload.id)
            }else{
             const filterArray = state[action.payload.name].filter((item)=> item !== action.payload.id)
             state[action.payload.name] = filterArray
            }
        }
        else{
            if(state[action.payload.name] === ""){
                state[action.payload.name] = "1"
            }
            else{
                state[action.payload.name] = ""
            }
        }
    }, 

    changePrice: (state, action) => {
        state.price.minPrice = action.payload.min
        state.price.maxPrice = action.payload.max
    },

    changeSort: (state, action) => {
        state.sort = action.payload
    },

    changeGeo: (state, action) => {
        state.geo_id = action.payload
    },

    changeCategory: (state, action) => {
        if(action.payload === "all"){
            state.categories = []
        }else{
            state.categories = [`${action.payload}`]
        }
    },

    setFiltersByUrl:(state, action) => {
        const dataFromUrl = action.payload
        for (const key in dataFromUrl){
            const value = dataFromUrl[key]
            state[key] = value
        }
    }





   
  },
})

export const { changeState, changePrice, changeSort, changeGeo, changeCategory, setFiltersByUrl} = filterSlice.actions

export default filterSlice.reducer