import React from "react";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import Menu from "./components/Menu";
import Footer from "./components/Footer";
import Dishes from "./components/Dishes";
import Reservation from "./components/Reservation";
import Review from "./components/Review";
import ScrollToTop from "./components/ScrollToTop";

const App = () => {
  return (
    <div>
      <Navbar />

      <main>
        <div id="home">
          <Home />
        </div>

        <div id="dishes">
          <Dishes />
        </div>

        <div id="about">
          <About />
        </div>

        <div id="menu">
          <Menu />
        </div>

        <div id="reservation">
          <Reservation />
        </div>

        <div id="review">
          <Review />
        </div>
      </main>

      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default App;