const WhyChooseUs = () => {
  return (
    <div className="py-16 bg-white">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-extrabold text-blue-600">
          Why Choose Us?
        </h2>
        <p className="text-lg font-semibold text-gray-700 max-w-3xl mx-auto">
          Discover the reasons why our customers trust us for their car buying
          experience. We are committed to providing the best cars, service, and
          experience.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4 md:px-12">
        <div className="bg-blue-50 p-6 rounded-lg shadow-lg text-center">
          <h3 className="text-2xl font-semibold text-blue-600 mb-4">
            Wide Selection
          </h3>
          <p className="text-lg text-gray-700">
            We offer a broad range of cars from all top brands to suit every
            need and budget.
          </p>
        </div>
        <div className="bg-blue-50 p-6 rounded-lg shadow-lg text-center">
          <h3 className="text-2xl font-semibold text-blue-600 mb-4">
            Expert Advice
          </h3>
          <p className="text-lg text-gray-700">
            Our team of experts are here to guide you in making the best choice
            based on your needs.
          </p>
        </div>
        <div className="bg-blue-50 p-6 rounded-lg shadow-lg text-center">
          <h3 className="text-2xl font-semibold text-blue-600 mb-4">
            Affordable Pricing
          </h3>
          <p className="text-lg text-gray-700">
            We offer competitive prices with flexible financing options to help
            you get the car you want.
          </p>
        </div>
      </div>
    </div>
  );
};

export default WhyChooseUs;
