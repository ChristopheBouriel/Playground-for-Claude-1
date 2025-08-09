import React from "react";
import Button from "../layouts/Button";

const Home = () => {
  return (
    <div className="min-h-screen flex flex-row justify-between items-center lg:px-32 px-5 bg-[url('/assets/img/hero.png')] bg-cover bg-no-repeat">
      <div className="w-full lg:w-2/3 space-y-5">
        <h1 className="text-lightText font-semibold text-5xl">
          Savor Gourmet Delights - Crafted with Passion, Delivered with
          Perfection
        </h1>
        <p className="text-lightText">
          Experience culinary excellence with our handcrafted dishes made from
          locally-sourced, seasonal ingredients.
        </p>
        <div className="md:pl-48 pl-28">
          <Button title="Order Now" whatsapp itemName="food items" />
        </div>
      </div>
    </div>
  );
};

export default Home;