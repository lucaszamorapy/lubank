import StatisticPage from "../components/statistic/StatisticPage";
import Header from "../components/header/Header";
import Head from "../helper/Head";

const Statistic = () => {
  return (
    <>
      <Head
        title="Estatísticas"
        description="Página das estatística dos seus gasto durante os meses selecionados"
      />
      <Header />
      <section className="animeLeft">
        <StatisticPage />
      </section>
    </>
  );
};

export default Statistic;
