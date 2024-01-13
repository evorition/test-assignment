import { ITEMS_PER_PAGE } from "../constants";

const calculateTotalPages = (stocks) => {
  const stocksLength = stocks.length;
  return Math.ceil(stocksLength / ITEMS_PER_PAGE);
};

export default calculateTotalPages;
