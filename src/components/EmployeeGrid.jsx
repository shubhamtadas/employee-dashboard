import { AgGridReact } from "ag-grid-react";
import { departmentColors } from "../data/departmentColors"
import { useMemo, useState } from "react";

/* ---------- Department Indicator ---------- */
const DepartmentIndicator = ({ value }) => {
  const departmentColors = {
    Engineering: "#2563eb",
    Marketing: "#d97706",
    Sales: "#059669",
    HR: "#7c3aed",
    Finance: "#0891b2",
  };

  return (
    <div
      className="role-indicator"
      style={{
        borderLeftColor: departmentColors[value] || "#6b7280",
      }}
    >
      {value}
    </div>
  );
};

/* ---------- Employee Grid ---------- */
const EmployeeGrid = ({ rowData }) => {
  const [quickFilterText, setQuickFilterText] = useState("");

  const columnDefs = useMemo(
    () => [
      { headerName: "ID", field: "id", width: 80 },

      {
        headerName: "Name",
        valueGetter: (p) => `${p.data.firstName} ${p.data.lastName}`,
        flex: 1.3,
      },

      { headerName: "Email", field: "email", flex: 1.5 },

      {
        headerName: "Department",
        field: "department",
        cellRenderer: DepartmentIndicator,
        flex: 1,
      },

      { headerName: "Position", field: "position", flex: 1.2 },

      { headerName: "Manager", field: "manager", flex: 1 },

      { headerName: "Location", field: "location", flex: 1 },

      {
        headerName: "Salary",
        field: "salary",
        valueFormatter: (p) => (p.value ? `₹${p.value.toLocaleString()}` : ""),
        width: 130,
      },

      {
        headerName: "Hire Date",
        field: "hireDate",
        valueFormatter: (p) =>
          p.value ? new Date(p.value).toLocaleDateString() : "",
        width: 130,
      },

      { headerName: "Age", field: "age", width: 90 },

      {
        headerName: "Performance",
        field: "performanceRating",
        width: 130,
      },

      {
        headerName: "Projects",
        field: "projectsCompleted",
        width: 110,
      },

      {
        headerName: "Skills",
        field: "skills",
        valueFormatter: (p) => p.value?.join(", "),
        flex: 1.5,
      },

      {
        headerName: "Status",
        valueGetter: (p) => (p.data.isActive ? "Active" : "Inactive"),
        width: 110,
        cellStyle: (p) => ({
          color: p.value === "Active" ? "#065f46" : "#9b1c1c",
          fontWeight: 500,
        }),
      },
    ],
    [],
  );

  const defaultColDef = useMemo(
    () => ({
      sortable: true,
      filter: true,
      resizable: true,
      minWidth: 120,
    }),
    [],
  );

  return (
    <>
      {/* Toolbar */}
      <div className="grid-toolbar">
        {/* Search */}
        <input
          type="text"
          placeholder="Search employees..."
          value={quickFilterText}
          onChange={(e) => setQuickFilterText(e.target.value)}
        />

        {/* Department Legend */}
        <div className="department-legend">
          {Object.entries(departmentColors).map(([dept, color]) => (
            <div key={dept} className="legend-item">
              <span
                className="legend-color"
                style={{ backgroundColor: color }}
              />
              <span>{dept}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="ag-theme-alpine grid-container">
        <AgGridReact
          rowData={rowData}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          quickFilterText={quickFilterText}
          pagination
          paginationPageSize={10}
          paginationPageSizeSelector={[10, 15, 20]}
          animateRows
          suppressCellFocus
          theme="legacy"
        />
      </div>
    </>
  );
};

export default EmployeeGrid;
