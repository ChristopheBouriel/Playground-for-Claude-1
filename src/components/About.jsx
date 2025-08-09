import React from "react";
import img from "/assets/img/about.png";
import Button from "../layouts/Button";

const About = () => {
  return (
    <div className="min-h-screen flex flex-col lg:flex-row justify-center items-center lg:px-32 px-5">
      <img src={img} alt="img" />

      <div className=" space-y-4 lg:pt-14">
        <h1 className=" font-semibold text-4xl text-center md:text-start">
          Our Story: Passion for Exceptional Dining
        </h1>
        <p>
          Founded by award-winning chefs, our restaurant brings together decades
          of culinary expertise and a commitment to sustainable practices. We
          source only the freshest local ingredients, partnering with trusted
          farmers to deliver authentic flavors you can taste in every dish.
        </p>
        <p>
          What sets us apart is our dedication to the complete dining experience
          - from our carefully crafted seasonal menus to our warm, attentive
          service. Whether you're joining us for a special occasion or everyday
          indulgence, we create memorable moments through food that nourishes
          both body and soul.
        </p>
        <div className=" flex justify-center lg:justify-start">
          <Button title="Discover Our Journey" />
        </div>
      </div>
    </div>
  );
};

export default About;