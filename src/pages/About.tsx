import { Button } from "antd";
import { Link } from "react-router-dom";
import { useAppSelector } from "../redux/hooks";
import { currentUser } from "../redux/features/auth/authSlice";
import Navbar from "../components/layout/Navbar";

const About = () => {
  const user = useAppSelector(currentUser);
  return (
    <div>
      {user ? <></> : <Navbar />}
      <div
        className="max-w-7xl flex flex-col"
        style={{ minHeight: "70vh", margin:"50px auto" }}
      >
        <div
          className="text-center"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginBottom: "30px",
          }}
        >
          <h1 className="text-4xl font-bold text-gray-800 mb-4">About Us</h1>
          <p className="text-gray-600 max-w-2xl">
            Welcome to our car dealership platform — your trusted destination to
            buy, sell, and explore a wide range of vehicles online. We are
            committed to delivering excellence, convenience, and security in
            every transaction.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div
            className="bg-white border border-gray-200 shadow-md rounded-lg hover:shadow-lg transition-shadow"
            style={{ padding: "15px" }}
          >
            <h2 className="text-xl font-semibold text-gray-700 mb-2">
              Our Mission
            </h2>
            <p className="text-gray-600">
              To provide a seamless and secure car buying experience through
              innovation, integrity, and exceptional customer support.
            </p>
          </div>

          <div
            className="bg-white border border-gray-200 shadow-md rounded-lg hover:shadow-lg transition-shadow"
            style={{ padding: "15px" }}
          >
            <h2 className="text-xl font-semibold text-gray-700 mb-2">
              What We Offer
            </h2>
            <p className="text-gray-600">
              We offer a wide selection of cars, transparent pricing, secure
              payment methods, and order tracking facilities.
            </p>
          </div>

          <div
            className="bg-white border border-gray-200 shadow-md rounded-lg  hover:shadow-lg transition-shadow"
            style={{ padding: "15px" }}
          >
            <h2 className="text-xl font-semibold text-gray-700 mb-2">
              Why Choose Us?
            </h2>
            <p className="text-gray-600">
              Trusted by hundreds of customers, we ensure satisfaction with
              quality cars, verified listings, and real-time updates on orders.
            </p>
          </div>
        </div>

        <div className="text-center" style={{ marginTop: "30px" }}>
          <Link to={`/cars`}>
            <Button
              type="primary"
              size="large"
              className="bg-blue-600 hover:bg-blue-700"
            >
              Explore Cars
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default About;
