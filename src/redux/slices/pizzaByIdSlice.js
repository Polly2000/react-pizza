import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchPizzaById = createAsyncThunk(
    'pizza/fetchPizzaById', // тип
    async (params) => {
        const { pizzaId } = params;
        const { data } = await axios.get(`https://649c3d9c048075719237c2de.mockapi.io/items/${pizzaId}`);
        return data;
    }
)

const initialState = {
    item: {},
    status: 'loading', // loading | success | error
}

const pizzaByIdSlice = createSlice({
    name: 'pizzaById',
    initialState,
    reducers: {

    }, 
    extraReducers: (builder) => {
        builder
            .addCase(fetchPizzaById.pending, (state) => {
                state.status = 'loading';
                state.item = {};
            })
            .addCase(fetchPizzaById.fulfilled, (state, action) => {
                state.status = 'success';
                state.item = action.payload;
            })
            .addCase(fetchPizzaById.rejected, (state) => {
                state.status = 'error';
                state.item = {};
            })
    }
})

export const selectPizzaById = (state) => state.pizzaById;

export default pizzaByIdSlice.reducer;