import { Outlet } from "react-router-dom";
import DashboardSideBar from "./DashboardSideBar";

const Admin = () => {
  return (
    <main className="mySection flex overflow-hidden">
      <DashboardSideBar />

      <section className="flex-grow overflow-auto p-4">
        <Outlet />
      </section>
    </main>
  );
};

export default Admin;
