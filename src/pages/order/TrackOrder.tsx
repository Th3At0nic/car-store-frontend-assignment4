import { useParams } from "react-router-dom";
import { useGetAnOrderQuery } from "../../redux/features/orderAndPayment/orderAndPaymentManagement.api";
import LoadingSpinner from "../../utils/LoadingSpinner";
import { NoDataCard } from "../../utils/NoDataCard";
import { Steps, Tag } from "antd";
import dayjs from "dayjs";

const statusSteps = [
  "PENDING",
  "CONFIRMED",
  "PROCESSING",
  "SHIPPED",
  "DELIVERED",
];

const getStatusStepIndex = (status: string) =>
  statusSteps.indexOf(status.toUpperCase());

const getStatusColor = (status: string) => {
  switch (status.toUpperCase()) {
    case "PENDING":
      return "default";
    case "CONFIRMED":
      return "blue";
    case "PROCESSING":
      return "orange";
    case "SHIPPED":
      return "purple";
    case "DELIVERED":
      return "green";
    default:
      return "default";
  }
};

const getPaymentTagColor = (status: string) => {
  switch (status.toUpperCase()) {
    case "PAID":
      return "green";
    case "UNPAID":
      return "orange";
    case "PAYMENT FAILED":
      return "red";
    default:
      return "default";
  }
};

const TrackOrder = () => {
  const { orderId } = useParams();

  const {
    data: orderData,
    isLoading,
    isError,
  } = useGetAnOrderQuery(orderId as string, {
    skip: !orderId,
  });

  if (isLoading) return <LoadingSpinner />;

  if (!orderData || isError) {
    return (
      <NoDataCard
        title="Empty"
        description="No Order Data found with the orderId at this moment"
      />
    );
  }

  const {
    customerName,
    customerEmail,
    customerPhone,
    customerAddress,
    orderStatus,
    paymentStatus,
    totalPrice,
    estimatedDeliveryStart,
    estimatedDeliveryEnd,
    createdAt,
    car,
  } = orderData?.data || {};

  const currentStep = getStatusStepIndex(orderStatus as string);

  return (
    <div className="max-w-5xl" style={{ margin: "auto auto" }}>
      <h1
        className="text-2xl font-semibold text-center"
        style={{ marginBottom: "30px" }}
      >
        Track Your Order
      </h1>

      {/* Status Tracker */}
      <div
        className="bg-white rounded-lg shadow-md"
        style={{ padding: "20px", marginBottom: "30px" }}
      >
        <Steps
          current={currentStep}
          size="small"
          responsive
          direction="horizontal"
          items={statusSteps.map((status) => ({
            title:
              status.charAt(0).toUpperCase() + status.slice(1).toLowerCase(),
          }))}
        />
      </div>

      {/* Order Details */}
      <div
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
        style={{ marginBottom: "30px" }}
      >
        <div
          className="bg-white rounded-lg shadow-md"
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            padding: "20px",
          }}
        >
          <h2 className="text-lg font-medium mb-2">Order Info</h2>
          <p>
            <strong>Order ID:</strong> {orderId}
          </p>
          <p>
            <strong>Placed on:</strong>{" "}
            {dayjs(createdAt).format("DD MMM, YYYY [at] hh:mm A")}
          </p>
          <p>
            <strong>Order Status: </strong>
            <Tag color={getStatusColor(orderStatus as string)}>
              {orderStatus}
            </Tag>
          </p>
          <p>
            <strong>Payment Status: </strong>
            <Tag color={getPaymentTagColor(paymentStatus as string)}>
              {paymentStatus}
            </Tag>
          </p>
          <p>
            <strong>Total Price:</strong> ৳{totalPrice}
          </p>
          {estimatedDeliveryStart && (
            <p>
              <strong>Estimated Delivery:</strong>{" "}
              {dayjs(estimatedDeliveryStart).format("DD MMM")} -{" "}
              {dayjs(estimatedDeliveryEnd).format("DD MMM")}
            </p>
          )}
        </div>

        <div
          className="bg-white rounded-lg shadow-md"
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            padding: "20px",
          }}
        >
          <h2 className="text-lg font-medium mb-2">Customer Info</h2>
          <p>
            <strong>Name:</strong> {customerName}
          </p>
          <p>
            <strong>Email:</strong> {customerEmail}
          </p>
          <p>
            <strong>Phone:</strong> {customerPhone}
          </p>
          <p>
            <strong>Address:</strong> {customerAddress}
          </p>
        </div>
      </div>

      {/* Car Info (Optional) */}
      {car && (
        <div
          className="bg-white rounded-lg shadow-md"
          style={{ padding: "20px" }}
        >
          <h2 className="text-lg font-medium mb-4">Car Details</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <p>
              <strong>Brand:</strong> {car.brand}
            </p>
            <p>
              <strong>Model:</strong> {car.model}
            </p>
            <p>
              <strong>Year:</strong> {car.year}
            </p>
            <p>
              <strong>Category:</strong> {car.category}
            </p>
            <p>
              <strong>Price:</strong> ৳{car.price}
            </p>
            <p>
              <strong>Available:</strong> {car.inStock ? "Yes" : "No"}
            </p>
          </div>
          <div
            className="flex gap-3 overflow-x-auto"
            style={{ marginTop: "20px" }}
          >
            {car.images?.map((img: string, index: number) => (
              <img
                key={index}
                src={img}
                alt={`Car Image ${index + 1}`}
                className="h-40 rounded-md border object-cover"
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TrackOrder;
