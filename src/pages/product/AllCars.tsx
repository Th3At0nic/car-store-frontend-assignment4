import { useState } from "react";
import { useGetAllCarsQuery } from "../../redux/features/product/productManagement.api";
import { TCar } from "../../types/bannerTypes";
import LoadingSpinner from "../../utils/LoadingSpinner";
import { NoDataCard } from "../../utils/NoDataCard";
import { Button, Card, Carousel, Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { Link, useParams } from "react-router-dom";
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";

const AllCars = ({ type }: { type: "admin" | "user" }) => {
  const { category } = useParams(); // Get category from URL params
  const [searchTerm, setSearchTerm] = useState<string>("");

  // Dynamically construct query parameters
  const queryParams = [];
  if (category) queryParams.push({ name: "category", value: category });
  if (searchTerm) queryParams.push({ name: "searchTerm", value: searchTerm });

  // Fetch cars with dynamic parameters
  const { data: cars, isLoading, error } = useGetAllCarsQuery(queryParams);

  if (isLoading) return <LoadingSpinner />;
  if (error)
    return (
      <NoDataCard
        title="No Car Found"
        description={`Currently, there are no ${category} available`}
      />
    );
  if (cars?.data?.length === 0) {
    return (
      <NoDataCard
        title="No Car Found"
        description="Sorry, currently no cars are available."
      />
    );
  }

  return (
    <div>
      {type === "user" && <Navbar />}

      <div className="cars-container">
        <div className="header">
          <h1 className="header-title">Browse All Cars</h1>
          <p className="header-description">Find the perfect car for you</p>
        </div>

        {/* Search Bar */}
        <div className="search-bar">
          <Input
            placeholder="Search for cars..."
            size="large"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            allowClear
          />
          <Button
            type="primary"
            size="large"
            icon={<SearchOutlined />}
            onClick={() => setSearchTerm(searchTerm.trim())}
          />
        </div>

        {/* Car Listings */}
        <div className="cars-grid">
          {cars?.data?.map((car: TCar) => (
            <Card
              key={car._id}
              hoverable
              className="car-card"
              cover={
                <Carousel autoplay className="car-carousel">
                  {car.images.map((img, index) => (
                    <img
                      key={index}
                      src={img || "/default-image.jpg"}
                      alt={car.brand}
                      className="car-image"
                    />
                  ))}
                </Carousel>
              }
            >
              <div className="car-info">
                <h3 className="car-title">
                  {car.brand} {car.model}
                </h3>
                <p className="car-price">$ {car.price}</p>
                {type === "user" ? (
                  <Link to={`/cars/${car._id}`}>
                    <Button type="primary" className="view-details-btn">
                      View Details
                    </Button>
                  </Link>
                ) : (
                  <div className="flex justify-center gap-3">
                    <Link to={`/cars/${car._id}`}>
                      <Button type="primary" className="view-details-btn">
                        View Details
                      </Button>
                    </Link>
                    <Link to={`/admin/update-car/${car._id}`}>
                      <Button type="primary" className="view-details-btn">
                        Update Info
                      </Button>
                    </Link>
                  </div>
                )}
              </div>
            </Card>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AllCars;
