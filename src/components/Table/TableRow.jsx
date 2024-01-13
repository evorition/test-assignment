import { utcToZonedTime, format } from "date-fns-tz";
import { Draggable } from "react-beautiful-dnd";

const TableRow = ({ stock, rowIndex, startPageIndex }) => {
  const formatDate = (epochTime) => {
    const date = new Date(epochTime);
    const zonedDate = utcToZonedTime(date, "America/New_York");
    return format(zonedDate, "yyy-MM-dd HH:mm:ss (z)");
  };

  return (
    <Draggable key={stock.symbol} draggableId={stock.symbol} index={rowIndex}>
      {(provided) => (
        <tr
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <td>{rowIndex + startPageIndex + 1}</td>
          {Object.entries(stock).map(([key, value], cellIndex) => (
            <td key={cellIndex}>
              {key === "time" ? formatDate(value) : value}
            </td>
          ))}
        </tr>
      )}
    </Draggable>
  );
};

export default TableRow;
