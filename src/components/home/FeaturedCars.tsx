import { Card, Button, Spin, Carousel } from "antd";
import { useGetAllCarsQuery } from "../../redux/features/product/productManagement.api";
import { TCar } from "../../types/bannerTypes";

const FeaturedCars = () => {
  const { data: cars, isLoading } = useGetAllCarsQuery(undefined);

  console.log("cars from featured: ", cars);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div
      className="py-16 bg-gray-100 px-4 md:px-12"
      style={{ margin: "30px 30px", position: "relative" }}
    >
      {/* Title Section */}
      <div className="text-center mb-16" style={{ marginBottom: "30px" }}>
        <h1 className="lg:text-5xl font-extrabold text-blue-600">
          Discover Our Top Featured Cars
        </h1>
        <p className="text-lg font-semibold text-gray-700 ">
          Explore the finest collection of cars, handpicked for their luxury,
          performance, and design. Find the perfect car that suits your style
          and needs.
        </p>
      </div>

      {/* "See More" Button */}
      <div className="absolute top-16 right-4">
        <Button
          type="primary"
          className="text-white"
          onClick={() => (window.location.href = "/cars")}
        >
          See All Cars
        </Button>
      </div>

      {/* Featured Cars Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {cars?.data.map((car: TCar, index: number) => (
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
                {car.price}
              </p>
              <Button
                type="primary"
                className="mt-4 w-full"
                onClick={() => (window.location.href = `/cars/${car._id}`)}
              >
                View Details
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default FeaturedCars;
