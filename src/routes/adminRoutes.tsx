import AdminDashboard from "../pages/admin/AdminDashboard";

export const adminPaths = [
  {
    name: "Dashboard",
    path: "dashboard",
    element: <AdminDashboard />,
  },
  {
    name: "All Orders",
    path: "orders",
    element: <AdminDashboard />,
  },
  {
    path: "/admin/orders/:orderId",
    element: <AdminDashboard />,
  },
];
