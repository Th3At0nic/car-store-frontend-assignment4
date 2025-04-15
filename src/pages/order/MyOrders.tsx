import { useGetMyOrdersQuery } from "../../redux/features/orderAndPayment/orderAndPaymentManagement.api";
import dayjs from "dayjs";
import { Card, Tag } from "antd";
import LoadingSpinner from "../../utils/LoadingSpinner";
import { NoDataCard } from "../../utils/NoDataCard";
import { TOrder } from "../../types";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../redux/hooks";
import { currentUser } from "../../redux/features/auth/authSlice";

const getOrderStatusColor = (status: string) => {
  switch (status) {
    case "CONFIRMED":
      return "green";
    case "PROCESSING":
      return "blue";
    case "SHIPPED":
      return "cyan";
    case "DELIVERED":
      return "purple";
    case "PENDING":
    default:
      return "orange";
  }
};

const getPaymentStatusColor = (status: string) => {
  switch (status) {
    case "PAID":
      return "green";
    case "PAYMENT FAILED":
      return "red";
    case "UNPAID":
    default:
      return "orange";
  }
};

const MyOrders = () => {
  const { data, isLoading } = useGetMyOrdersQuery("");
  const user = useAppSelector(currentUser);
  const navigate = useNavigate();

  const orders: TOrder[] = data?.data || [];

  const handleTrackOrder = (orderId: string) => {
    navigate(`/${user!.role}/orders/${orderId}`);
  };

  if (isLoading) return <LoadingSpinner />;
  if (!data || !orders) {
    return (
      <NoDataCard
        title="Empty Orders"
        description="You have no orders at this moment"
      />
    );
  }
  return (
    <div className="px-4 md:px-10 py-6">
      <h1 className="text-2xl md:text-3xl font-semibold mb-6 text-center">
        My Orders
      </h1>

      <div
        style={{
          // display: "grid",
          // gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          display: "flex",
          flexWrap: "wrap",
          gap: 24,
          marginTop: 16,
        }}
      >
        {orders.map((order) => (
          <Card
            key={order._id}
            title={`Order ID: ${order._id.slice(-6).toUpperCase()}`}
            className="hover:shadow-xl transition-shadow duration-300 border-4 border-gray-400 rounded-lg"
          >
            <p>
              <span className="font-semibold">Name:</span> {order.customerName}
            </p>
            <p>
              <span className="font-semibold">Email:</span>{" "}
              {order.customerEmail}
            </p>
            <p>
              <span className="font-semibold">Phone:</span>{" "}
              {order.customerPhone}
            </p>
            <p>
              <span className="font-semibold">Address:</span>{" "}
              {order.customerAddress}
            </p>
            <p>
              <span className="font-semibold">Car ID:</span> {order.car._id}
            </p>
            <p>
              <span className="font-semibold">Quantity:</span> {order.quantity}
            </p>
            <p>
              <span className="font-semibold">Total Price:</span> ৳
              {order.totalPrice}
            </p>
            <p>
              <span className="font-semibold">Ordered At:</span>{" "}
              {dayjs(order.createdAt).format("DD MMM YYYY, h:mm A")}
            </p>

            {order.estimatedDeliveryStart && (
              <p>
                <span className="font-semibold">Delivery Window:</span>
                <br />
                {dayjs(order.estimatedDeliveryStart).format("DD MMM")} -{" "}
                {dayjs(order.estimatedDeliveryEnd).format("DD MMM")}
              </p>
            )}

            <div className="mt-3 flex flex-wrap">
              <Tag color={getOrderStatusColor(order.orderStatus)}>
                {order.orderStatus}
              </Tag>
              <Tag color={getPaymentStatusColor(order.paymentStatus)}>
                {order.paymentStatus}
              </Tag>
              <Tag
                onClick={() => handleTrackOrder(order._id)}
                style={{ cursor: "pointer" }}
              >
                Track Order
              </Tag>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default MyOrders;
