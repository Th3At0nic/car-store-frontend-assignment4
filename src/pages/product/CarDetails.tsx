import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  useDeleteACarMutation,
  useGetCarDetailsQuery,
} from "../../redux/features/product/productManagement.api";
import { NoDataCard } from "../../utils/NoDataCard";
import LoadingSpinner from "../../utils/LoadingSpinner";
import { Button } from "antd";
import { useAppSelector } from "../../redux/hooks";
import {
  TUserFromToken,
  userCurrentToken,
} from "../../redux/features/auth/authSlice";
import { verifyToken } from "../../utils/verifyToken";
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";
import { toast } from "sonner";
import { TError } from "../../types";

const CarDetails = ({ type }: { type: "admin" | "user" }) => {
  const { carId } = useParams();
  const { data: carDetails, isLoading } = useGetCarDetailsQuery(carId);
  const car = carDetails?.data;
  const [deleteCar] = useDeleteACarMutation();

  const [selectedImage, setSelectedImage] = useState(car?.images[0] || "");

  const token = useAppSelector(userCurrentToken);
  const user = token ? (verifyToken(token as string) as TUserFromToken) : null;
  const navigate = useNavigate();

  const handleCarDelete = async () => {
    const toastId = toast.loading("Deleting the car...");

    const result = await deleteCar(carId);

    if (result?.data?.success) {
      toast.success(result.data.message, { id: toastId });
      setTimeout(() => {
        navigate("/admin/cars");
      }, 1000);
    } else if (result?.error) {
      toast.error(
        (result.error as TError)?.data?.message ||
          "Delete Failed. Something went wrong",
        { id: toastId }
      );
    }
  };

  const onUpdateCarClick = () => {
    console.log("update car button clicked");
    if (user?.role === "admin") {
      navigate(`/admin/update-car/${carId}`);
    }
  };

  const onBuyNowClick = () => {
    if (user) {
      navigate(`/cars/${carId}/checkout`);
    } else {
      navigate("/login", { state: { from: `/cars/${carId}/checkout` } });
    }
  };

  if (isLoading) return <LoadingSpinner />;

  if (!car) {
    return (
      <NoDataCard
        title="No Car Found"
        description="Sorry, we couldn't find any car with the given ID."
      />
    );
  }

  return (
    <div>
      {type === "user" && <Navbar />}

      <div className="car-details-container">
        {/* Page Title */}
        <h1 className="car-details-title">
          {car.brand} {car.model} ({car.year})
        </h1>

        {/* Main Layout */}
        <div className="car-details-content">
          {/* Image Gallery */}
          <div className="car-image-section">
            {/* Large Main Image */}
            <div className="main-image-container">
              <img
                src={selectedImage || car.images[0]}
                alt={car.brand}
                className="main-image"
              />
            </div>

            {/* Thumbnail Gallery */}
            <div className="thumbnail-gallery">
              {car.images.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`${car.brand} ${car.model}`}
                  className={`thumbnail ${
                    selectedImage === img ? "active-thumbnail" : ""
                  }`}
                  onClick={() => setSelectedImage(img)}
                />
              ))}
            </div>
          </div>

          {/* Car Details Section */}
          <div className="car-info-section">
            <h2 className="car-info-title">
              {car.brand} {car.model} ({car.year})
            </h2>
            <p className="car-description">{car.description}</p>

            {/* Car Info */}
            <div className="car-info-details">
              <p>
                <strong>Category:</strong> {car.category}
              </p>
              <p>
                <strong>Year:</strong> {car.year}
              </p>
              <p>
                <strong>Price:</strong>{" "}
                <span className="price">৳ {car.price}</span>
              </p>
              <p>
                <strong>Stock:</strong>{" "}
                <span className={car.inStock ? "in-stock" : "out-of-stock"}>
                  {car.inStock ? "Available" : "Out of Stock"}
                </span>
              </p>
              <p>
                <strong>Quantity:</strong> {car.quantity}
              </p>
            </div>

            {user?.role === "admin" ? (
              <div className="flex justify-around gap-2">
                <div className="buy-now-btn w-full">
                  <Button
                    onClick={onUpdateCarClick}
                    type="primary"
                    size="large"
                  >
                    Update Car Info
                  </Button>
                </div>
                <div className="buy-now-btn w-full">
                  <Button
                    onClick={handleCarDelete}
                    type="primary"
                    danger
                    size="large"
                  >
                    Delete
                  </Button>
                </div>
              </div>
            ) : (
              <div className="buy-now-btn">
                <Button
                  disabled={!car.inStock || user?.role === "admin"}
                  onClick={onBuyNowClick}
                  type="primary"
                  size="large"
                >
                  Buy Now
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CarDetails;
