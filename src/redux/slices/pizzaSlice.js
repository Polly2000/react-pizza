import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchPizzas = createAsyncThunk(
    'pizza/fetchPizzasStatus', // тип
    async (params) => {
        const {category, search, sortType, currentPage} = params;
        const { data } = await axios.get(`https://649c3d9c048075719237c2de.mockapi.io/items?page=${currentPage}&limit=4${category}&sortBy=${sortType}&order=desc${search}`);
        return data;
    }
)

const initialState = {
    items: [],
    status: 'loading', // loading | success | error
}

const pizzaSlice = createSlice({
    name: 'pizza',
    initialState,
    reducers: {
        setItems(state, action) {
            state.items = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchPizzas.pending, (state) => {
                state.status = 'loading';
                state.items = [];
            })
            .addCase(fetchPizzas.fulfilled, (state, action) => {
                state.status = 'success';
                state.items = action.payload;
            })
            .addCase(fetchPizzas.rejected, (state, action) => {
                state.status = 'error';
                state.items = [];
            })
    }
});

export const selectPizzaData = (state) => state.pizza;

export const { setItems } = pizzaSlice.actions;

export default pizzaSlice.reducer;