import React, { useEffect, useRef } from "react";
import $ from "jquery";

interface TableProps {
  users: any[];
  onDelete: (userId: string) => void;
}

const Table: React.FC<TableProps> = ({ users, onDelete }) => {
  const tableRef = useRef<HTMLTableElement>(null);

  useEffect(() => {
    const currentTableRef = tableRef.current;

    if (currentTableRef) {
      const dataTable = $(currentTableRef).DataTable({
        columns: [
          { title: "ID" },
          { title: "Name" },
          { title: "Age/Sex" },
          { title: "Mobile" },
          { title: "Address" },
          { title: "ID Type" },
          { title: "ID Number" },
          { title: "Action" },
        ],
      });

      dataTable.clear();

      users.forEach((user) => {
        const deleteButton = `<button onclick="handleDelete('${user.id}')">Delete</button>`;
        dataTable.row.add([
          user.id,
          user.name,
          user.id,
          user.name,
          user.id,
          user.name,
          user.id,
          deleteButton,
        ]);
      });

      dataTable.draw();

      $(currentTableRef).DataTable();

      return () => {
        dataTable.destroy();
      };
    }
  }, [users, onDelete]);

  (window as any).handleDelete = (userId: string) => {
    onDelete(userId);
  };

  return (
    <div style={{ paddingTop: "60px" }}>
      <table ref={tableRef}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Mobile</th>
            <th>Age</th>
            <th>Sex</th>
            <th>ID Type</th>
            <th>ID Number</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>{/* DataTable will populate rows dynamically */}</tbody>
      </table>
    </div>
  );
};

export default Table;
