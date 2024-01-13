import { configureStore } from "@reduxjs/toolkit";

import stocksReducer from "./reducers/stocksSlice";

export default configureStore({
  reducer: {
    stocks: stocksReducer,
  },
});
