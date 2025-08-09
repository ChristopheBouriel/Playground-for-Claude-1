import React, { useState } from "react";
import { Link } from "react-scroll";
import { BiRestaurant } from "react-icons/bi";
import Button from "../layouts/Button";
import { AiOutlineMenuUnfold } from "react-icons/ai";
import { BiChevronDown } from "react-icons/bi";
import { AiOutlineClose } from "react-icons/ai";

const Navbar = () => {
  const [menu, setMenu] = useState(false);

  const handleChange = () => {
    setMenu(!menu);
  };

  const closeMenu = () => {
    setMenu(false);
  };

  const dishCategories = [
    { name: "🔥 Spicy Delights", keyword: "spicy" },
    { name: "🍝 Chef's Pasta Specials", keyword: "pasta" },
    { name: "🥩 Premium Grilled Meats", keyword: "grilled" },
    { name: "🌱 Plant-Based Creations", keyword: "vegetarian" },
    { name: "🍣 Fusion Cuisine", keyword: "fusion" },
    { name: "🍰 Decadent Desserts", keyword: "desserts" },
  ];

  return (
    <div className="fixed w-full">
      <div>
        <div className=" flex flex-row justify-between p-5 lg:px-10 md:px-8 px-4 bg-white shadow-[0_3px_10px_rgb(0,0,0,0.5)]">
          <div className=" flex flex-row items-center cursor-pointer">
            <span>
              <img src="/chef.png" alt="" width={50} height={40} />
            </span>
            <h1 className="text-xl font-semibold">SavoryGrid</h1>
          </div>

          <nav className="hidden lg:flex flex-row items-center text-xl font-medium gap-8">
            <Link
              to="home"
              spy={true}
              smooth={true}
              duration={500}
              className="hover:text-brightColor transition-all cursor-pointer"
            >
              Home
            </Link>

            <div className="relative group">
              <div className=" flex items-center gap-1">
                <Link
                  to="dishes"
                  spy={true}
                  smooth={true}
                  duration={500}
                  className="hover:text-brightColor transition-all cursor-pointer"
                >
                  Dishes
                </Link>

                <BiChevronDown className="cursor-pointer" size={25} />
              </div>

              <ul className="absolute hidden space-y-2 group-hover:block bg-white border border-gray-300 rounded-lg p-5 min-w-[350px]">
                {dishCategories.map((category, index) => (
                  <li key={index}>
                    <Link
                      to="dishes"
                      spy={true}
                      smooth={true}
                      duration={500}
                      className="flex items-center gap-2 text-gray-800 hover:text-brightColor transition-all cursor-pointer py-2 px-3 rounded hover:bg-gray-50"
                      aria-label={`View ${category.name.replace(
                        /[^\w\s]/gi,
                        ""
                      )}`}
                    >
                      {category.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <Link
              to="about"
              spy={true}
              smooth={true}
              duration={500}
              className="hover:text-brightColor transition-all cursor-pointer"
            >
              About
            </Link>

            <Link
              to="menu"
              spy={true}
              smooth={true}
              duration={500}
              className="hover:text-brightColor transition-all cursor-pointer"
            >
              Menu
            </Link>

            <Link
              to="reservation"
              spy={true}
              smooth={true}
              duration={500}
              className="hover:text-brightColor transition-all cursor-pointer"
            >
              Reservations
            </Link>

            <Link
              to="review"
              spy={true}
              smooth={true}
              duration={500}
              className="hover:text-brightColor transition-all cursor-pointer"
            >
              Reviews
            </Link>
          </nav>

          <div className="lg:hidden flex items-center">
            {menu ? (
              <AiOutlineClose size={25} onClick={handleChange} />
            ) : (
              <AiOutlineMenuUnfold size={25} onClick={handleChange} />
            )}
          </div>
        </div>
        <div
          className={` ${
            menu ? "translate-x-0" : "-translate-x-full"
          } lg:hidden flex flex-col absolute bg-black text-white left-0 top-20 font-semibold text-2xl text-center pt-8 pb-8 gap-8 w-full h-fit transition-transform duration-300`}
        >
          <Link
            to="home"
            spy={true}
            smooth={true}
            duration={500}
            className="hover:text-brightColor transition-all cursor-pointer"
            onClick={closeMenu}
          >
            Home
          </Link>
          <Link
            to="dishes"
            spy={true}
            smooth={true}
            duration={500}
            className="hover:text-brightColor transition-all cursor-pointer"
            onClick={closeMenu}
          >
            Dishes
          </Link>
          <Link
            to="about"
            spy={true}
            smooth={true}
            duration={500}
            className="hover:text-brightColor transition-all cursor-pointer"
            onClick={closeMenu}
          >
            About
          </Link>
          <Link
            to="menu"
            spy={true}
            smooth={true}
            duration={500}
            className="hover:text-brightColor transition-all cursor-pointer"
            onClick={closeMenu}
          >
            Menu
          </Link>

          <Link
            to="reservation"
            spy={true}
            smooth={true}
            duration={500}
            className="hover:text-brightColor transition-all cursor-pointer"
            onClick={closeMenu}
          >
            Reservations
          </Link>

          <Link
            to="review"
            spy={true}
            smooth={true}
            duration={500}
            className=" hover:text-brightColor transition-all cursor-pointer"
            onClick={closeMenu}
          >
            Reviews
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;