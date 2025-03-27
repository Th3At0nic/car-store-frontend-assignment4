import { Button, Carousel } from "antd";
import { useGetAllCarsQuery } from "../../redux/features/product/productManagement.api";
import { TCar } from "../../types/bannerTypes";

const HeroSection = () => {
  const { data: cars } = useGetAllCarsQuery(undefined);

  return (
    <div
      className="relative w-full min-h-screen flex flex-col-reverse lg:flex-row items-center justify-between bg-gradient-to-r from-gray-900 to-gray-800 px-4 sm:px-6 lg:px-12 text-white"
      style={{ paddingLeft: "20px" }}
    >
      {/* Left Side: Text and CTA */}
      <div className="w-full lg:w-1/2 space-y-6 text-center lg:text-left">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
          Drive Your Dream – Explore the Best Cars Today!
        </h1>
        <p className="text-base sm:text-lg text-gray-300">
          Find the perfect ride from our premium collection. Great deals,
          trusted service!
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4 mt-4">
          <Button
            type="primary"
            size="large"
            className="bg-blue-500 border-none px-6 py-3 text-lg font-semibold"
          >
            Explore Cars
          </Button>
          <Button
            size="large"
            className="bg-transparent border border-white text-white px-6 py-3 text-lg font-semibold"
          >
            Get Started
          </Button>
        </div>
      </div>

      {/* Right Side: Car Image Slider */}
      <div className="w-full lg:w-1/2 flex justify-center mt-8 lg:mt-0">
        {cars ? (
          <Carousel
            autoplay
            effect="fade"
            className="w-full sm:w-[400px] md:w-[500px] lg:w-[750px] h-[250px] sm:h-[300px] md:h-[400px] lg:h-[450px]"
          >
            {cars.data?.flatMap((car: TCar) =>
              car.images.map((img, index) => (
                <div
                  key={`${car._id}-${index}`}
                  className="flex justify-center"
                >
                  <img
                    src={img}
                    alt={`${car.brand} ${car.model}`}
                    className="w-full min-h-[200px] sm:min-h-[250px] md:min-h-[300px] object-cover rounded-2xl shadow-lg"
                  />
                </div>
              ))
            )}
          </Carousel>
        ) : (
          <p className="text-lg">Loading featured cars...</p>
        )}
      </div>
    </div>
  );
};

export default HeroSection;
