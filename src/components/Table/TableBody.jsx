import { useSelector } from "react-redux";

import { ITEMS_PER_PAGE } from "../../constants";

import {
  selectCurrentStocks,
  selectPageIndex,
} from "../../reducers/stocksSlice";

const TableBody = () => {
  const stocks = useSelector(selectCurrentStocks);
  const startPageIndex = useSelector(selectPageIndex) * ITEMS_PER_PAGE;

  return (
    <tbody>
      {stocks.map((stock, rowIndex) => (
        <tr key={rowIndex}>
          <td>{startPageIndex + rowIndex + 1}</td>
          {Object.values(stock).map((value, cellIndex) => (
            <td key={cellIndex}>{value}</td>
          ))}
        </tr>
      ))}
    </tbody>
  );
};

export default TableBody;
