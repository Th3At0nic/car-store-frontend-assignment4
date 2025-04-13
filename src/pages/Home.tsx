import Hero from "../components/home/Hero";
import FeaturedCars from "../components/home/FeaturedCars";
import Categories from "../components/home/Categories";
import WhyChooseUs from "../components/home/WhyChooseUs";
import Testimonials from "../components/home/Testimonials";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

const Home = () => {
  return (
    <div className="bg-gray-100">
      <Navbar />
      <Hero />
      <FeaturedCars />
      <Categories />
      <WhyChooseUs />
      <Testimonials />
      <Footer />
    </div>
  );
};

export default Home;
