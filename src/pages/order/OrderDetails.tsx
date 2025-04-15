import { useNavigate, useParams } from "react-router-dom";
import {
  useDeleteOrderMutation,
  useGetAnOrderQuery,
} from "../../redux/features/orderAndPayment/orderAndPaymentManagement.api";
import LoadingSpinner from "../../utils/LoadingSpinner";
import { NoDataCard } from "../../utils/NoDataCard";
import { Button, Card, Descriptions, Divider, Image, Tag } from "antd";
import { TError, TOrder } from "../../types";
import { DeleteOutlined } from "@ant-design/icons";
import { toast } from "sonner";

const OrderDetails = () => {
  const navigate = useNavigate();
  const { orderId } = useParams();
  const [deleteOrder] = useDeleteOrderMutation();
  const {
    data: orderDetails,
    isLoading,
    isError,
  } = useGetAnOrderQuery(orderId as string, { skip: !orderId });

  if (isLoading) return <LoadingSpinner />;
  if (!orderDetails || isError) {
    return (
      <NoDataCard
        title="Empty"
        description="Order Details not found at this moment"
      />
    );
  }

  const {
    _id,
    customerEmail,
    customerName,
    customerPhone,
    customerAddress,
    orderStatus,
    paymentStatus,
    quantity,
    totalPrice,
    estimatedDeliveryStart,
    estimatedDeliveryEnd,
    car,
    createdAt,
  } = orderDetails.data as TOrder;

  const handleDelete = async (orderId: string) => {
    const result = await deleteOrder(orderId);

    if (result?.data?.success) {
      toast.success(result.data.message);
      setTimeout(() => {
        navigate("/admin/orders");
      }, 1000);
    } else if (result?.error) {
      toast.error((result?.error as TError)?.data.message);
    } else {
      toast.error("Something Went Wrong. Couldn't Delete");
    }
  };

  return (
    <div className="md:p-8 max-w-6xl" style={{ margin: "30px auto" }}>
      <div className="flex justify-center">
        <h1 className="text-3xl font-semibold">Order Details</h1>
      </div>

      <Card className="shadow-md rounded-2xl" style={{ marginBottom: "30px" }}>
        <Descriptions
          title="Customer Information"
          bordered
          column={{ xs: 1, sm: 1, md: 2 }}
        >
          <Descriptions.Item label="Name">{customerName}</Descriptions.Item>
          <Descriptions.Item label="Email">{customerEmail}</Descriptions.Item>
          <Descriptions.Item label="Phone">{customerPhone}</Descriptions.Item>
          <Descriptions.Item label="Address">
            {customerAddress}
          </Descriptions.Item>
        </Descriptions>
      </Card>

      <Card className="shadow-md rounded-2xl" style={{ marginBottom: "30px" }}>
        <Descriptions
          title="Order Information"
          bordered
          column={{ xs: 1, sm: 1, md: 2 }}
        >
          <Descriptions.Item label="Order Status">
            <Tag color={orderStatus === "SHIPPED" ? "green" : "orange"}>
              {orderStatus}
            </Tag>
          </Descriptions.Item>
          <Descriptions.Item label="Payment Status">
            <Tag color={paymentStatus === "PAID" ? "blue" : "red"}>
              {paymentStatus}
            </Tag>
          </Descriptions.Item>
          <Descriptions.Item label="Quantity">{quantity}</Descriptions.Item>
          <Descriptions.Item label="Total Price">
            ৳{totalPrice}
          </Descriptions.Item>
          <Descriptions.Item label="Order Date">
            {new Date(createdAt).toLocaleString()}
          </Descriptions.Item>
          <Descriptions.Item label="Delivery Estimate">
            {new Date(estimatedDeliveryStart as string).toLocaleDateString()} -{" "}
            {new Date(estimatedDeliveryEnd as string).toLocaleDateString()}
          </Descriptions.Item>
        </Descriptions>
      </Card>

      <Card className="shadow-md rounded-2xl" style={{ marginBottom: "30px" }}>
        <Descriptions
          title="Car Information"
          bordered
          column={{ xs: 1, sm: 1, md: 2 }}
        >
          <Descriptions.Item label="Brand">{car.brand}</Descriptions.Item>
          <Descriptions.Item label="Model">{car.model}</Descriptions.Item>
          <Descriptions.Item label="Year">{car.year}</Descriptions.Item>
          <Descriptions.Item label="Category">{car.category}</Descriptions.Item>
          <Descriptions.Item label="Price">৳{car.price}</Descriptions.Item>
          <Descriptions.Item label="In Stock">
            <Tag color={car.inStock ? "green" : "red"}>
              {car.inStock ? "Yes" : "No"}
            </Tag>
          </Descriptions.Item>
          <Descriptions.Item label="Description" span={2}>
            {car.description}
          </Descriptions.Item>
        </Descriptions>

        <Divider orientation="left">Car Images</Divider>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {car.images.map((img, index) => (
            <Image
              key={index}
              src={img}
              alt={`car-img-${index}`}
              className="rounded-xl"
            />
          ))}
        </div>
      </Card>
      <Button
        danger
        size="large"
        icon={<DeleteOutlined />}
        onClick={() => handleDelete(_id)}
      >
        Delete Order
      </Button>
    </div>
  );
};

export default OrderDetails;
