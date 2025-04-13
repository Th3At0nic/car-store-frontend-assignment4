import { Button, Typography } from "antd";
import { Link } from "react-router-dom";

const { Title, Paragraph } = Typography;

const UserDashboard = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-6 bg-white p-8 rounded-xl shadow-md">
      <Title level={2} className="!text-3xl md:!text-4xl"></Title>
      <Title level={2} className="!text-3xl md:!text-4xl">
        Welcome to Your Dashboard 👋
      </Title>
      <Paragraph className="text-base md:text-lg text-gray-600 max-w-xl">
        Here you can view your order status, track deliveries, and manage your
        shopping activities. We’ll keep adding more features like payment
        history and delivery updates.
      </Paragraph>
      <Link to="/home">
        <Button type="primary" size="large" className="px-8 py-2 rounded-xl">
          Continue Shopping
        </Button>
      </Link>
    </div>
  );
};

export default UserDashboard;
