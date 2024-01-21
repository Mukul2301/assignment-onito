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
          user.age + "/" + user.sex,
          user.mobile,
          user.address +
            " " +
            user.city +
            " " +
            user.pinCode +
            "\n" +
            " " +
            user.state +
            " " +
            user.country,
          user.IDType,
          user.IDNumber,
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
      <table ref={tableRef}></table>
    </div>
  );
};

export default Table;
