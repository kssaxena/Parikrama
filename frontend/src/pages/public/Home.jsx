import Navbar from "../../components/layout/Navbar";
import Button from "../../components/common/Button";

const Home = () => {
  return (
    <>
      <Navbar />
      <section className="max-w-7xl mx-auto px-6 py-20 text-center">
        <h1 className="text-4xl font-bold text-gray-900">
          Explore India Smarter
        </h1>
        <p className="mt-4 text-gray-600">
          Discover places, plan routes, and travel efficiently.
        </p>
        <div className="mt-8">
          <Button>Start Exploring</Button>
        </div>
      </section>
    </>
  );
};

export default Home;
