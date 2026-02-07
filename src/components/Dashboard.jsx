import EmployeeGrid from "./EmployeeGrid";
import { employees } from "../data/employees";

const Dashboard = () => {
  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>Employee Dashboard</h1>
        <p>Client-side AG Grid implementation using React</p>
      </header>

      <section className="dashboard-content">
        <EmployeeGrid rowData={employees} />
      </section>
    </div>
  );
};

export default Dashboard;