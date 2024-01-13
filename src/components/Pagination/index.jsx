import { useDispatch, useSelector } from "react-redux";

import {
  incrementPage,
  decrementPage,
  selectPageIndex,
  selectTotalPages,
} from "../../reducers/stocksSlice";
import "./Pagination.css";

const Pagination = () => {
  const dispatch = useDispatch();
  const pageIndex = useSelector(selectPageIndex);
  const totalPages = useSelector(selectTotalPages);

  const handleNextPage = () => {
    dispatch(incrementPage());
  };

  const handlePreviousPage = () => {
    dispatch(decrementPage());
  };

  return (
    <div className="pagination-container">
      <button
        className="pagination-button"
        onClick={handlePreviousPage}
        disabled={pageIndex === 0}
      >
        Previous
      </button>
      <span className="page-info">{`Page ${
        pageIndex + 1
      } of ${totalPages}`}</span>
      <button
        className="pagination-button"
        onClick={handleNextPage}
        disabled={pageIndex === totalPages}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
