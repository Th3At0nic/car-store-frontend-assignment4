import { useParams } from "react-router-dom";
import {
  useGetCarDetailsQuery,
  useOrderCarMutation,
} from "../redux/features/product/productManagement.api";
import { useState } from "react";
import { Card, InputNumber, Button, Typography } from "antd";
import { toast } from "sonner";
import { currentUser } from "../redux/features/auth/authSlice";
import { useAppSelector } from "../redux/hooks";
import LoadingSpinner from "../utils/LoadingSpinner";
import { NoDataCard } from "../utils/NoDataCard";

const { Title, Text } = Typography;

const Checkout = () => {
  const { carId } = useParams();
  const [orderCar] = useOrderCarMutation();
  const user = useAppSelector(currentUser);
  const { data: carDataResponse, isLoading } = useGetCarDetailsQuery(carId);

  const carData = carDataResponse?.data;
  const [quantity, setQuantity] = useState(1);

  if (isLoading) return <LoadingSpinner />;
  if (!carData)
    return (
      <NoDataCard
        title="Car not found"
        description="Unfortunately Checkout info not found, try again"
      />
    );

  const totalPrice = carData.price * quantity;

  const handleOrder = async () => {
    console.log(quantity, carData.quantity);
    if (quantity > carData.quantity) {
      alert("Not enough stock available!");
      return;
    }

    const orderData = {
      car: carData._id,
      email: user?.userEmail,
      quantity,
      totalPrice,
    };

    const res = await orderCar(orderData);
    toast.success("Order is Pending.Pay Now To Confirm the Order");

    setTimeout(() => {
      const paymentUrl = res?.data?.data?.paymentUrl;
      if (paymentUrl) {
        window.location.href = paymentUrl;
      }
    }, 3000);
  };

  return (
    <div className="flex justify-center">
      <div className="max-w-4xl">
        <Title level={2} className="text-center mb-6">
          Checkout
        </Title>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Car Details */}
          <Card
            hoverable
            cover={
              <img
                src={carData.images[0]}
                alt="Car"
                className="h-64 object-cover rounded-t-lg"
              />
            }
            className="shadow-lg"
          >
            <Title level={4}>
              {carData.brand} {carData.model}
            </Title>
            <Text>Year: {carData.year}</Text>
            <br />
            <Text>Category: {carData.category}</Text>
            <br />
            <Text strong>Price per unit: ${carData.price}</Text>
            <br />
            <Text type={carData.inStock ? "success" : "danger"}>
              {carData.inStock ? "In Stock" : "Out of Stock"}
            </Text>
          </Card>

          {/* Order Summary */}
          <Card className="shadow-lg">
            <Title level={4}>Order Summary</Title>

            <div className="flex justify-between items-center my-4">
              <Text strong>Quantity:</Text>
              <InputNumber
                min={1}
                value={quantity}
                onChange={(value) => setQuantity(value || 1)}
                className="w-20"
              />
            </div>

            <div className="flex justify-between items-center">
              <Text strong>Total Price:</Text>
              <Text className="text-lg font-semibold">${totalPrice}</Text>
            </div>

            <div className="mt-6">
              <Title level={5}>Payment Method</Title>
              <Text type="secondary">SurjoPay (Integration Coming Soon)</Text>
            </div>

            <Button
              type="primary"
              block
              className="mt-6 bg-blue-600 hover:bg-blue-700"
              size="large"
              onClick={handleOrder}
            >
              Order Now
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
