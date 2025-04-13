import ActionButton from "../../components/ui/ActionButton";
import DashboardCard from "../../components/ui/DashboardCard";
import { useGetAllOrdersQuery } from "../../redux/features/orderAndPayment/orderAndPaymentManagement.api";
import {
  useCalculateRevenueQuery,
  useGetAllCarsQuery,
} from "../../redux/features/product/productManagement.api";
import { useGetAllUsersQuery } from "../../redux/features/user/userManagement.api";
import { TUser } from "../../types";

const AdminDashboard = () => {
  const { data: totalOrders } = useGetAllOrdersQuery(undefined);
  const { data: revenue } = useCalculateRevenueQuery(undefined);
  const { data: usersData } = useGetAllUsersQuery(undefined);
  const { data: allCarsData } = useGetAllCarsQuery(undefined);

  const totalOrdersCount = totalOrders?.data?.length || 0;
  const totalRevenue = revenue?.data?.[0]?.totalRevenue || 0;
  const carsInStockCount = allCarsData?.data?.length || 0;
  const totalCustomers =
    usersData?.data?.filter((user: TUser) => user.role === "user").length || 0;

  return (
    <div style={{ padding: "10px", margin: "30px auto" }}>
      <div className="flex justify-center" style={{marginBottom: "30px"}}>
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <DashboardCard title="Total Orders" value={totalOrdersCount} />
        <DashboardCard title="Total Revenue" value={`$${totalRevenue}`} />
        <DashboardCard title="Cars in Stock" value={carsInStockCount} />
        <DashboardCard title="Total Customers" value={totalCustomers} />
      </div>

      <div className="flex flex-wrap gap-4">
        <ActionButton label="Manage Orders" link="/admin/manage-orders" />
        <ActionButton label="Add Car" link="/admin/add-car" />
        <ActionButton label="Manage Users" link="/admin/manage-users" />
      </div>
    </div>
  );
};

export default AdminDashboard;
