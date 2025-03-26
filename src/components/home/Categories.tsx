import sedanImg from "../../assets/images/marcedes1Front.jpg";
import suvImg from "../../assets/images/SUV.jpg";
import truckImg from "../../assets/images/Truck.jpg";
import coupeImg from "../../assets/images/coupe1f.jpg";
import convertibleImg from "../../assets/images/Convertible1.jpg";

const categories = [
  { name: "Sedan", image: sedanImg },
  { name: "SUV", image: suvImg },
  { name: "Truck", image: truckImg },
  { name: "Coupe", image: coupeImg },
  { name: "Convertible", image: convertibleImg },
];

const BrowseByCategory = () => {
  const handleCategoryClick = (category: string) => {
    // history.push(`/cars?category=${category}`);
    console.log(category);
  };

  return (
    <div
      className="bg-gradient-to-r from-gray-900 to-gray-800 px-4 lg:px-10 text-white"
      style={{ padding: "50px 50px" }}
    >
      <div className="text-center lg:h-30">
        <h2 className="text-5xl font-extrabold mx-auto">Browse by Category</h2>
        <br />
        <p className="text-lg font-semibold text-gray-400 mx-auto">
          Find your ideal car by selecting a category.
        </p>
      </div>

      {/* Category Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4 md:px-12 justify-items-center">
        {categories.map((category) => (
          <div
            key={category.name}
            className="cursor-pointer hover:scale-105 transition-transform duration-500"
            onClick={() => handleCategoryClick(category.name)}
          >
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-auto aspect-[16/9] object-cover"
              />
              <div className="text-center p-4">
                <h3 className="text-xl font-semibold text-gray-800">
                  {category.name}
                </h3>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BrowseByCategory;
