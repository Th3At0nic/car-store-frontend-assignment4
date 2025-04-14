/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  useDeleteOrderMutation,
  useGetAllOrdersQuery,
  useUpdateOrderStatusMutation,
} from "../../redux/features/orderAndPayment/orderAndPaymentManagement.api";
import LoadingSpinner from "../../utils/LoadingSpinner";
import { TError, TOrder } from "../../types";
import { Card, Tag, Typography, Button, Dropdown, MenuProps } from "antd";
import { DownOutlined, DeleteOutlined, EyeOutlined } from "@ant-design/icons";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const { Title, Text } = Typography;

const AllOrders = () => {
  const [updateOrderStatus] = useUpdateOrderStatusMutation();
  const [deleteOrder] = useDeleteOrderMutation();
  const { data: allOrders, isLoading } = useGetAllOrdersQuery(undefined);
  const navigate = useNavigate();

  const getOrderStatusTag = (status: string) => {
    switch (status) {
      case "CONFIRMED":
        return <Tag color="green">{status}</Tag>;
      case "PENDING":
      default:
        return <Tag color="gold">{status}</Tag>;
    }
  };

  const getPaymentStatusTag = (status: string) => {
    switch (status) {
      case "PAID":
        return <Tag color="blue">{status}</Tag>;
      case "PAYMENT FAILED":
        return <Tag color="red">{status}</Tag>;
      default:
        return <Tag color="gold">{status}</Tag>;
    }
  };

  const handleDelete = async (orderId: string) => {
    const result = await deleteOrder(orderId);

    if (result?.data?.success) {
      toast.success(result.data.message);
    } else if (result?.error) {
      toast.error((result?.error as TError)?.data.message);
    } else {
      toast.error("Something Went Wrong. Couldn't Delete");
    }
  };

  const handleViewDetails = (orderId: string) => {
    navigate(`/admin/orders/${orderId}`);
  };

  const handleStatusChange = async (orderId: string, item: any) => {
    const updateStatusData = {
      orderStatus: item.key,
    };
    const result = await updateOrderStatus({ orderId, updateStatusData });
    if (result?.data?.success) {
      toast.success(result.data.message);
    }
    if (result?.error) {
      toast.error((result.error as TError).data.message);
    }
  };

  const statusOptions = ["PROCESSING", "SHIPPED", "DELIVERED"];

  const items: MenuProps["items"] = statusOptions.map((status) => ({
    label: status,
    key: status,
  }));

  return (
    <div style={{ padding: "20px" }}>
      <div className="flex justify-center">
        <Title level={1}>All Orders</Title>
      </div>

      {isLoading ? (
        <LoadingSpinner />
      ) : (
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
          {allOrders?.data?.map((order: TOrder) => (
            <Card
              key={order._id}
              hoverable
              cover={
                <img
                  alt={`${order.car.brand} ${order.car.model}`}
                  src={order.car.images[0]}
                  style={{ height: 200, objectFit: "cover" }}
                />
              }
            >
              {/* Car Info */}
              <Title level={5}>
                {order.car.brand} {order.car.model} ({order.car.year})
              </Title>
              <Text type="secondary">Category: {order.car.category}</Text>

              {/* Customer Info */}
              <div style={{ marginTop: 12 }}>
                <Text>
                  <strong>Name:</strong> {order.customerName}
                </Text>
                <br />
                <Text>
                  <strong>Email:</strong> {order.customerEmail}
                </Text>
                <br />
                <Text>
                  <strong>Phone:</strong> {order.customerPhone}
                </Text>
                <br />
                <Text>
                  <strong>Address:</strong> {order.customerAddress}
                </Text>
              </div>

              {/* Status Tags */}
              <div
                style={{
                  marginTop: 12,
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 8,
                }}
              >
                {getOrderStatusTag(order.orderStatus)}
                {getPaymentStatusTag(order.paymentStatus)}
                <Tag color="purple">৳ {order.totalPrice}</Tag>
              </div>

              {/* Delivery Dates */}
              {order.estimatedDeliveryStart && order.estimatedDeliveryEnd && (
                <div style={{ marginTop: 12 }}>
                  <Text type="secondary">
                    <strong>Delivery:</strong>{" "}
                    {new Date(
                      order.estimatedDeliveryStart
                    ).toLocaleDateString()}{" "}
                    -{" "}
                    {new Date(order.estimatedDeliveryEnd).toLocaleDateString()}
                  </Text>
                </div>
              )}

              {/* Action Buttons */}
              <div
                style={{
                  marginTop: 16,
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 10,
                }}
              >
                <Button
                  type="primary"
                  icon={<EyeOutlined />}
                  onClick={() => handleViewDetails(order._id)}
                >
                  View Details
                </Button>
                <Dropdown
                  menu={{
                    items,
                    onClick: (item) => handleStatusChange(order._id, item),
                  }}
                  trigger={["click"]}
                  disabled={order.orderStatus === "PENDING"}
                >
                  <Button
                    type="default"
                    icon={<DownOutlined />}
                    disabled={order.orderStatus === "PENDING"}
                  >
                    Update Status
                  </Button>
                </Dropdown>
                <Button
                  icon={<DeleteOutlined />}
                  danger
                  onClick={() => handleDelete(order._id)}
                >
                  Delete
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllOrders;
