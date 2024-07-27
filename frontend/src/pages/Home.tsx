import Header from "../components/header/Header";
import PageHome from "../components/home/PageHome";

const Home = () => {
  return (
    <>
      <Header />
      <section className="px-5 lg:px-0">
        <PageHome />
      </section>
    </>
  );
};

export default Home;
