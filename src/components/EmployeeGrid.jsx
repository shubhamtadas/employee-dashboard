import { AgGridReact } from "ag-grid-react";
import { useMemo, useState } from "react";

/* ---------- Role Badge Renderer ---------- */
const RoleIndicator = ({ value }) => {
  const roleColorMap = {
    "Frontend Engineer": "#2563eb",
    "Backend Engineer": "#16a34a",
    "QA Engineer": "#ca8a04",
    "UI Engineer": "#7c3aed",
    "DevOps Engineer": "#dc2626",
    "Tech Lead": "#111827",
    "Product Manager": "#0f766e",
    "Product Analyst": "#4b5563",
    "UX Designer": "#db2777",
  };

  const color = roleColorMap[value] || "#6b7280";

  return (
    <div
      className="role-indicator"
      style={{ borderLeft: `4px solid ${color}` }}
    >
      {value}
    </div>
  );
};

const LegendItem = ({ label, color }) => {
  return (
    <div className="legend-item">
      <span
        className="legend-line"
        style={{ backgroundColor: color }}
      />
      <span className="legend-label">{label}</span>
    </div>
  );
};

/* ---------- Grid Component ---------- */
const EmployeeGrid = ({ data }) => {
  const [quickFilterText, setQuickFilterText] = useState("");

  const columnDefs = useMemo(
    () => [
      { headerName: "ID", field: "id", width: 80, sortable: true },
      { headerName: "Name", field: "name", sortable: true, filter: true },
      {
        headerName: "Role",
        field: "role",
        sortable: true,
        filter: true,
        cellRenderer: RoleIndicator,
      },
      {
        headerName: "Experience (Years)",
        field: "experience",
        sortable: true,
        filter: "agNumberColumnFilter",
      },
      { headerName: "Location", field: "location", filter: true },
    ],
    [],
  );

  const defaultColDef = useMemo(
    () => ({
      flex: 1,
      minWidth: 120,
      resizable: true,
    }),
    [],
  );

  return (
    <>
      <div className="grid-toolbar">
        <input
          type="text"
          placeholder="Search employees..."
          value={quickFilterText}
          onChange={(e) => setQuickFilterText(e.target.value)}
        />

        <div className="role-legend">
          <LegendItem label="Frontend" color="#2563eb" />
          <LegendItem label="Backend" color="#16a34a" />
          <LegendItem label="QA" color="#ca8a04" />
          <LegendItem label="UI" color="#7c3aed" />
          <LegendItem label="DevOps" color="#dc2626" />
        </div>
      </div>

      <div className="ag-theme-alpine grid-container">
        <AgGridReact
          theme="legacy"
          rowData={data}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          quickFilterText={quickFilterText}
          pagination
          paginationPageSize={10}
          paginationPageSizeSelector={[10, 15, 20]}
          animateRows
          suppressCellFocus
        />
      </div>
    </>
  );
};

export default EmployeeGrid;
