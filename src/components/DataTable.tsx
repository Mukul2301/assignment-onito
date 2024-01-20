import React, { FC, useEffect, useRef } from "react";
import { User } from "../types";

interface DataTableProps {
  users: User[];
}

const DataTable: FC<DataTableProps> = ({ users }) => {
  const tableRef = useRef<HTMLTableElement | null>(null);
  const dataTableRef = useRef<DataTables.Api | null>(null);
  useEffect(() => {
    const currentTableRef = tableRef.current;

    if (currentTableRef) {
      if (dataTableRef.current) {
        // DataTable instance already exists, destroy it first
        dataTableRef.current.destroy();
      }

      // Create a new DataTable instance
      const newDataTable = $(currentTableRef).DataTable({
        columns: [
          { title: "ID" },
          { title: "Name" },
          { title: "Mobile" },
          { title: "Age" },
          { title: "Sex" },
          { title: "ID Type" },
          { title: "ID Number" },
          { title: "Country" },
          // Add more columns based on your user data
        ],
      });

      // Clear existing rows
      newDataTable.clear();

      // Add users to DataTable
      users.forEach((user) => {
        newDataTable.row.add([
          user.id,
          user.name,
          user.mobile,
          user.age,
          user.sex,
          user.IDType,
          user.IDNumber,
          user.country,
          // Add more columns based on your user data
        ]);
      });

      // Draw the updated DataTable
      newDataTable.draw();

      // Store the DataTable instance in the ref
      dataTableRef.current = newDataTable;
    }
  }, [users]);

  useEffect(() => {
    // Example: Destroy the DataTable when the component unmounts
    return () => {
      if (dataTableRef.current) {
        dataTableRef.current.destroy();
      }
    };
  }, []);
  return (
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
          <th>Country</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr key={user.id}>
            <td>{user.id}</td>
            <td>{user.name}</td>
            <td>{user.mobile}</td>
            <td>{user.age}</td>
            <td>{user.sex}</td>
            <td>{user.IDType}</td>
            <td>{user.IDNumber}</td>
            <td>{user.country}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default DataTable;
