import Hero from "./hero";
import PopularSection from "./popular";
import NavigationBar from "./navigation";

const Home = () => {
  return (
    <div>
      <NavigationBar />
      <Hero />
      <PopularSection />
    </div>
  );
};

export default Home;
