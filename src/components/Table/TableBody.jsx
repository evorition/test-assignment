import { useSelector, useDispatch } from "react-redux";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

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
              <Draggable
                key={stock.symbol}
                draggableId={stock.symbol}
                index={rowIndex}
              >
                {(provided) => (
                  <tr
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    <td>{startPageIndex + rowIndex + 1}</td>
                    {Object.values(stock).map((value, cellIndex) => (
                      <td key={cellIndex}>{value}</td>
                    ))}
                  </tr>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </tbody>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default TableBody;
