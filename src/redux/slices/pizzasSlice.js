import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";


export  const fetchPizzas = createAsyncThunk ('pizza/fetchPizzasStatus', async (params, thunkAPI) => {
    const {sortBy, order, category, currentPage} = params
    const {data} = await axios.get(
        `http://localhost:9001/pizza?_page=${currentPage}&_limit=4&${category}_sort=${order}${sortBy}`
    )
    return data
})


const initialState = {
    items: [],
    status: 'loading' //loading/success/error
}


export const pizzasSlice = createSlice({
    name: 'pizza',
    initialState,
    reducers: {
        setItems(state, action) {
            state.items = action.payload
        }
    },
    extraReducers:  (builder) => {
    builder.addCase(fetchPizzas.pending, (state, action) => {
        state.status = 'loading';
        state.items = [];
    });

    builder.addCase(fetchPizzas.fulfilled, (state, action) => {
        state.status = 'success';
        state.items = action.payload;

    });

    builder.addCase(fetchPizzas.rejected, (state, action) => {
        state.status = 'error';
        state.items = [];
    });
}
})

/*export const selectPizzaData = (state) => state.filter*/

export const {setItems} = pizzasSlice.actions

export default pizzasSlice.reducer