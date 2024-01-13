import { useDispatch, useSelector } from "react-redux";

import {
  incrementPage,
  decrementPage,
  selectPageIndex,
  selectTotalPages,
} from "../../reducers/stocksSlice";

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
    <div>
      <button onClick={handlePreviousPage} disabled={pageIndex === 0}>
        Previous
      </button>
      <span>{`Page ${pageIndex + 1} of ${totalPages}`}</span>
      <button onClick={handleNextPage} disabled={pageIndex === totalPages}>
        Next
      </button>
    </div>
  );
};

export default Pagination;
