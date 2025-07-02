import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface cartoonShows {
    title: String,
    year: Number,
    creator: String[],
    rating: String,
    genre: String[],
    runtime_in_minutes: Number,
    episodes: Number,
    image: String,
    id: Number
}

interface cartoonState {
    cartoons: cartoonShows[],
    loading: boolean,
    error: String | null
}

const initialState: cartoonState = {
    cartoons: [],
    loading: false,
    error: null
}

export const fetchCartoons = createAsyncThunk("cartoons/shows", async () => {
    try{
        const fetchData = await fetch("https://api.sampleapis.com/cartoons/cartoons2D");
        const data:cartoonShows[] = await fetchData.json()
        return data
    }catch(e:any) {
        return e.message || "Network Error"
    }
    
} )

const cartoonSlice = createSlice({
    name: "cartoons",
    initialState: initialState,
    reducers:{},
    extraReducers: (builder) => {
        builder.addCase(fetchCartoons.pending, (state) => {
            state.loading = true;
            state.error = null;
        }).addCase(fetchCartoons.fulfilled, (state,action) => {
            state.cartoons = action.payload;
            state.loading = false
        }).addCase(fetchCartoons.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || 'Something went wrong'
        })
    }
})

export default cartoonSlice.reducer