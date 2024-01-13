import { ITEMS_PER_PAGE } from "../constants";

const paginateStocks = (stocks, pageIndex) => {
  const startIndex = pageIndex * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  return stocks.slice(startIndex, endIndex);
};

export default paginateStocks;
