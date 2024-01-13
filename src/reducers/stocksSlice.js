import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import calculateTotalPages from "../helpers/calculateTotalPages";
import paginateStocks from "../helpers/paginateStocks";

const initialState = {
  allStocks: [],
  currentStocks: [],
  pageIndex: 0,
  totalPages: 0,
  status: "idle",
};

export const fetchStocks = createAsyncThunk("stocks/fetchStocks", async () => {
  const response = await fetch(
    `https://cloud.iexapis.com/stable/tops/last?token=${process.env.REACT_APP_API_PK}`
  );
  const result = await response.json();
  return result;
});

const stocksSlice = createSlice({
  name: "stocks",
  initialState,
  reducers: {
    incrementPage: (state, action) => {
      const nextPageIndex = state.pageIndex + 1;
      if (nextPageIndex <= state.totalPages) {
        state.currentStocks = paginateStocks(state.allStocks, nextPageIndex);
        state.pageIndex = nextPageIndex;
      }
    },
    decrementPage: (state, action) => {
      const previousPageIndex = state.pageIndex - 1;
      if (previousPageIndex >= 0) {
        state.currentStocks = paginateStocks(
          state.allStocks,
          previousPageIndex
        );
        state.pageIndex = previousPageIndex;
      }
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchStocks.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchStocks.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.allStocks = action.payload;
        state.totalPages = calculateTotalPages(action.payload);
        state.currentStocks = paginateStocks(action.payload, state.pageIndex);
      })
      .addCase(fetchStocks.rejected, (state, action) => {
        state.status = "failed";
      });
  },
});

export const selectCurrentStocks = (state) => state.stocks.currentStocks;

export const selectPageIndex = (state) => state.stocks.pageIndex;

export const selectTotalPages = (state) => state.stocks.totalPages;

export const { incrementPage, decrementPage } = stocksSlice.actions;

export default stocksSlice.reducer;
