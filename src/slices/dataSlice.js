import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    volunteersData: null
}

const dataSlice = createSlice({
    name: "data",
    initialState,
    reducers:{
        populateData: (state, action) => {
            state.volunteersData = action.payload
        },
        clearData: (state) => {
            state.volunteersData = null
        }
    }
})

export const { populateData, clearData } = dataSlice.actions

export default dataSlice.reducer;