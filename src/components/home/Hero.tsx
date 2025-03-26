import { Button } from "antd";
import { Carousel } from "antd";
import { useGetAllCarsQuery } from "../../redux/features/product/productManagement.api";
import { TCar } from "../../types/bannerTypes";

const HeroSection = () => {
  const { data: cars } = useGetAllCarsQuery(undefined);

  return (
    <div className="relative w-full h-[80vh] flex flex-col lg:flex-row items-center justify-between bg-gradient-to-r from-gray-900 to-gray-800 px-4 lg:px-10 text-white">
      {/* Left Side: Text and CTA */}
      <div className="w-full lg:w-1/2 space-y-6 lg:pr-10">
        <div className="space-x-10">
          <h1 className="text-3xl lg:text-5xl font-bold text-center lg:text-left">
            Drive Your Dream – Explore the Best Cars Today!
          </h1>
          <p
            className="text-lg text-gray-300 text-center lg:text-left"
            style={{ margin: "10px 0" }}
          >
            Find the perfect ride from our premium collection. Great deals,
            trusted service!
          </p>
        </div>
        <div className="space-x-10 text-center lg:text-left">
          <Button
            type="primary"
            size="large"
            className="bg-blue-500 border-none"
            style={{ marginRight: "15px" }}
          >
            Explore Cars
          </Button>
          <Button
            size="large"
            className="bg-transparent border border-white text-white"
          >
            Get Started
          </Button>
        </div>
      </div>

      {/* Right Side: Dynamic Car Image Slider */}
      <div className="w-full lg:w-1/2 flex justify-center lg:pl-10 mt-6 lg:mt-0">
        {cars ? (
          <Carousel
            autoplay
            effect="fade"
            className="w-full lg:w-[750px] h-[450px] lg:h-[450px]"
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
                    className="w-full h-full object-cover rounded-2xl shadow-2xl"
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
