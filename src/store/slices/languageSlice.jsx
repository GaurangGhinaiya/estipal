import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../services";

export const fetchLanguages = createAsyncThunk(
    "languages/fetchLanguages",
    async (_, thunkAPI) => {
        try {
            const response = await axiosInstance.get("/languages?show_all=true");
            return response?.payload?.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

const initialState = {
    languages: [],
    loading: false,
    error: null,
};

const languageSlice = createSlice({
    name: "languages",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchLanguages.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchLanguages.fulfilled, (state, action) => {
                state.loading = false;
                state.languages = action.payload;
            })
            .addCase(fetchLanguages.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Failed to fetch languages";
            });
    },
});

export default languageSlice.reducer;
