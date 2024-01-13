import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchStocks } from "./reducers/stocksSlice";

import ErrorMessage from "./components/ErrorMessage";
import LoadingSpinner from "./components/LoadingSpinner";
import Pagination from "./components/Pagination";
import Table from "./components/Table";
import "./App.css";

const App = () => {
  const dispatch = useDispatch();

  const stocksStatus = useSelector((state) => state.stocks.status);

  useEffect(() => {
    if (stocksStatus === "idle") {
      dispatch(fetchStocks());
    }
  }, [stocksStatus, dispatch]);

  let content;

  if (stocksStatus === "loading") {
    content = <LoadingSpinner />;
  } else if (stocksStatus === "failed") {
    content = <ErrorMessage />;
  } else if (stocksStatus === "succeeded") {
    content = (
      <>
        <Pagination />
        <Table />
      </>
    );
  }

  return <div className="app">{content}</div>;
};

export default App;
