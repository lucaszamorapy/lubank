import Header from "../components/header/Header";
import HomePage from "../components/home/HomePage";

const Home = () => {
  return (
    <>
      <Header />
      <section className="px-5 lg:px-0">
        <HomePage />
      </section>
    </>
  );
};

export default Home;
