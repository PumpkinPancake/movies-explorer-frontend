import Promo from "./Promo/Promo";

import AboutMe from "./AboutMe/AboutMe";
import AboutProject from "./AboutProject/AboutProject";
import Portfolio from "./Portfolio/Portfolio";
import Techs from "./Techs/Techs";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

export default function Main() {
  return (
    <>
      <main>
      <Promo />
      <AboutProject />
      <Techs />
      <AboutMe />
      <Portfolio />
      </main>
      <Footer />
    </>
  );
}
