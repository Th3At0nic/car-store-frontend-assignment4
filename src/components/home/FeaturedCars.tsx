import { Card, Button, Carousel } from "antd";
import { useGetAllCarsQuery } from "../../redux/features/product/productManagement.api";
import { TCar } from "../../types/bannerTypes";
import { Link } from "react-router-dom";
import LoadingSpinner from "../../utils/LoadingSpinner";
import { NoDataCard } from "../../utils/NoDataCard";

const FeaturedCars = () => {
  const { data: cars, isLoading } = useGetAllCarsQuery(undefined);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (cars?.data?.length === 0) {
    return (
      <NoDataCard
        title="No Featured Cars"
        description="sorry, currently there is no featured cars"
      />
    );
  }

  return (
    <div
      className="py-16 bg-gray-100 px-4 md:px-12"
      style={{ margin: "50px 50px", position: "relative" }}
    >
      {/* Title Section */}
      <div className="text-center mb-16" style={{ marginBottom: "30px" }}>
        <h1 className="lg:text-5xl font-extrabold text-blue-600">
          Discover Our Top Featured Cars
        </h1>
        <p className="text-lg font-semibold text-gray-700 ">
          Find the perfect car that suits your style and needs.
        </p>
      </div>

      {/* "See More" Button */}
      <div className="absolute top-16 right-4">
        <Link to={"/cars"}>
          <Button type="primary" className="text-white">
            See All Cars
          </Button>
        </Link>
      </div>

      {/* Featured Cars Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {cars?.data?.map((car: TCar, index: number) => (
          <Card
            key={index}
            hoverable
            className="shadow-lg rounded-lg"
            cover={
              <Carousel autoplay>
                {car.images.map((img, index) => (
                  <img
                    key={index}
                    src={img || "/default-image.jpg"}
                    alt={car.brand}
                    className="w-full h-56 object-cover rounded-lg"
                  />
                ))}
              </Carousel>
            }
          >
            <div className="text-center">
              <h3 className="text-2xl font-semibold text-gray-800">
                {car.brand} {car.model}
              </h3>
              <p className="text-lg font-bold text-gray-600 mt-2">
                ৳ {car.price}
              </p>
              <Link to={`/cars/${car._id}`}>
                <Button type="primary" className="mt-4 w-full">
                  View Details
                </Button>
              </Link>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default FeaturedCars;
