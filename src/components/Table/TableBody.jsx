import { useSelector, useDispatch } from "react-redux";
import { DragDropContext, Droppable } from "react-beautiful-dnd";

import TableRow from "./TableRow";

import { ITEMS_PER_PAGE } from "../../constants";

import {
  reorderStocks,
  selectCurrentStocks,
  selectPageIndex,
} from "../../reducers/stocksSlice";

const TableBody = () => {
  const dispatch = useDispatch();

  const stocks = useSelector(selectCurrentStocks);
  const startPageIndex = useSelector(selectPageIndex) * ITEMS_PER_PAGE;

  const onBeforeDragStart = () => {
    const cells = document.querySelectorAll(`tr > td`);
    console.log(cells);
    cells.forEach((cell) => {
      const computedStyle = window.getComputedStyle(cell);
      cell.style.width = computedStyle.width;
    });
  };

  const onDragEnd = ({ destination, source }) => {
    if (!destination) {
      return;
    }

    dispatch(reorderStocks({ destination, source }));
  };

  return (
    <DragDropContext
      onBeforeDragStart={onBeforeDragStart}
      onDragEnd={onDragEnd}
    >
      <Droppable droppableId="stocks">
        {(provided) => (
          <tbody ref={provided.innerRef} {...provided.droppableProps}>
            {stocks.map((stock, rowIndex) => (
              <TableRow
                key={rowIndex}
                stock={stock}
                rowIndex={rowIndex}
                startPageIndex={startPageIndex}
              />
            ))}
            {provided.placeholder}
          </tbody>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default TableBody;
