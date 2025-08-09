import React from "react";
import ReviewCard from "../layouts/ReviewCard";
import img1 from "/assets/img/pic1.png";
import img2 from "/assets/img/pic2.png";
import img3 from "/assets/img/pic3.png";

const Review = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center md:px-32 px-5">
      <h1 className="text-4xl font-semibold text-center lg:pt-16 pt-24 pb-10">
        What Our Customers Say
      </h1>
      <div className="flex flex-col md:flex-row gap-8 mt-5">
        <ReviewCard
          img={img1}
          name="Sophia Azura"
          review="The truffle pasta was absolute perfection! Every bite was a flavor explosion. The ambiance and service made our anniversary dinner truly magical. We'll definitely be back for the seasonal tasting menu!"
        />
        <ReviewCard
          img={img2}
          name="John Deo"
          review="As a food blogger, I've tried countless restaurants, but this place stands out. Their farm-to-table approach shines in dishes like the heirloom tomato salad. The chef's creativity with local ingredients is remarkable!"
        />
        <ReviewCard
          img={img3}
          name="Victoria Zoe"
          review="Found my new favorite brunch spot! The avocado toast with poached eggs was Instagram-worthy and tasted even better. Service was attentive without being intrusive. Can't wait to bring my friends next weekend!"
        />
      </div>
    </div>
  );
};

export default Review;