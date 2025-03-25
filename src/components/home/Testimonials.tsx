const reviews = [
  { name: "John Doe", text: "CarNexa helped me find my dream car easily!" },
  { name: "Sarah Lee", text: "Amazing service and smooth process!" },
];

const Testimonials = () => {
  return (
    <div className="py-12 bg-gray-100">
      <h2 className="text-3xl font-semibold text-center mb-6">
        What Our Customers Say
      </h2>
      <div className="space-y-6 max-w-2xl mx-auto">
        {reviews.map((review, index) => (
          <div key={index} className="bg-white p-6 shadow-md rounded-lg">
            <p className="italic">"{review.text}"</p>
            <h4 className="font-bold mt-2">- {review.name}</h4>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Testimonials;
