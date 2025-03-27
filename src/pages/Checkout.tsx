import { useParams } from "react-router-dom";
import { useGetCarDetailsQuery } from "../redux/features/product/productManagement.api";
import { useState } from "react";
import { Card, InputNumber, Button, Typography } from "antd";
import { toast } from "sonner";

const { Title, Text } = Typography;

const Checkout = () => {
  const { carId } = useParams();
  const { data: carDataResponse, isLoading } = useGetCarDetailsQuery(carId);

  const carData = carDataResponse?.data;
  const [quantity, setQuantity] = useState(1);

  if (isLoading)
    return <p className="text-center text-lg">Loading car details...</p>;
  if (!carData)
    return <p className="text-center text-red-500">Car not found!</p>;

  const totalPrice = carData.price * quantity;

  const handleOrder = () => {
    console.log(quantity, carData.quantity);
    if (quantity > carData.quantity) {
      alert("Not enough stock available!");
      return;
    }

    const orderData = {
      carId: carData._id,
      brand: carData.brand,
      model: carData.model,
      price: carData.price,
      quantity,
      totalPrice,
      paymentMethod: "SurjoPay (Pending Integration)",
    };

    console.log("Order Placed: ", orderData);
    toast.success("Order placed successfully! (Payment will be added later)");
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
