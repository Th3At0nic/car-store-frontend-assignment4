const categories = ["SUV", "Sedan", "Electric", "Sports"];

const Categories = () => {
  return (
    <div className="py-12 bg-gray-50">
      <h2 className="text-3xl font-semibold text-center mb-6">
        Browse by Category
      </h2>
      <div className="flex justify-center space-x-4">
        {categories.map((cat) => (
          <button
            key={cat}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            {cat}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Categories;
