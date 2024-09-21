import Header from "../components/header/Header";
import HomePage from "../components/home/HomePage";
import Head from "../helper/Head";

const Home = () => {
  return (
    <>
      <Header />
      <Head
        title="Home"
        description="Home Lubank, contém formas de armazenar seus gastos"
      />
      <section className="px-5 lg:px-0 animeLeft">
        <HomePage />
      </section>
    </>
  );
};

export default Home;
