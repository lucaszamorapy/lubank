import "react-toastify/dist/ReactToastify.css";
import Graphic from "./Graphic";
import Greetings from "../Greetings";

const StatisticPage = () => {
  return (
    <section>
      <div className="container">
        <Greetings />
        <Graphic />
      </div>
    </section>
  );
};

export default StatisticPage;
