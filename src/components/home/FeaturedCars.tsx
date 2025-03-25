import { Card, Button } from "antd";

const cars = [
  { id: 1, name: "Tesla Model S", price: "$80,000", img: "/tesla.jpg" },
  { id: 2, name: "BMW X5", price: "$60,000", img: "/bmw.jpg" },
  { id: 3, name: "Mercedes G-Wagon", price: "$150,000", img: "/mercedes.jpg" },
];

const FeaturedCars = () => {
  return (
    <div className="py-12 bg-white">
      <h2 className="text-3xl font-semibold text-center mb-8">
        Top Featured Cars
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-4 md:px-12">
        {cars.map((car) => (
          <Card
            key={car.id}
            cover={
              <img src={car.img} alt={car.name} className="h-48 object-cover" />
            }
          >
            <h3 className="text-xl font-semibold">{car.name}</h3>
            <p className="text-lg font-bold">{car.price}</p>
            <Button type="primary" className="w-full mt-4">
              Buy Now
            </Button>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default FeaturedCars;
