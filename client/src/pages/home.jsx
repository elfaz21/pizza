import FeaturedPizzaCarousel from "../components/caroselSlider";
import Fasting from "../components/fasting";
import Footer from "../components/footer";
import HeroSection from "../components/hero";
import Navbar from "../components/navbar";
import PopularPizza from "../components/popularPizza";
import TopRestorant from "../components/topRestaurants";

function Home() {
  return (
    <div className="overflow-hidden">
      <Navbar />
      <HeroSection />
      <FeaturedPizzaCarousel />
      <TopRestorant />
      <PopularPizza />
      <Fasting />
      <Footer />
    </div>
  );
}
export default Home;
