import TableHeader from "./TableHeader";
import TableBody from "./TableBody";
import "./Table.css";

const Table = () => {
  return (
    <table className="table">
      <TableHeader />
      <TableBody />
    </table>
  );
};

export default Table;
