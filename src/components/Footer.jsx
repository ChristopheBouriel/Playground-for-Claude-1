import React from "react";
import { BsFacebook, BsInstagram } from "react-icons/bs";
import { RiTwitterXFill } from "react-icons/ri";
import { Link } from "react-scroll";

const Footer = () => {
  return (
    <div className="bg-black text-white rounded-t-3xl mt-8 md:mt-0">
      <div className="flex flex-col md:flex-row justify-between p-8 md:px-32 px-5 text-center md:text-left gap-8">
        <div className="w-full md:w-1/4">
          <h1 className="font-bold text-xl pb-4 text-brightColor ">
            SavoryGrid
          </h1>
          <p className="text-sm ">
            Where culinary artistry meets unforgettable dining experiences.
          </p>
        </div>
        <div>
          <h1 className="font-bold text-xl pb-4 pt-5 md:pt-0 text-normalText">
            Quick Links
          </h1>
          <nav className="flex flex-col gap-2">
            <Link
              to="home"
              spy={true}
              smooth={true}
              duration={500}
              className="hover:text-brightColor transition-all cursor-pointer"
            >
              Home
            </Link>
            <Link
              to="dishes"
              spy={true}
              smooth={true}
              duration={500}
              className="hover:text-brightColor transition-all cursor-pointer"
            >
              Our Specialties
            </Link>
            <Link
              to="about"
              spy={true}
              smooth={true}
              duration={500}
              className="hover:text-brightColor transition-all cursor-pointer"
            >
              Our Story
            </Link>
            <Link
              to="review"
              spy={true}
              smooth={true}
              duration={500}
              className="hover:text-brightColor transition-all cursor-pointer"
            >
              Testimonials
            </Link>
          </nav>
        </div>
        <div>
          <h1 className="font-bold text-xl pb-4 pt-5 md:pt-0 text-normalText">
            Discover
          </h1>
          <nav className="flex flex-col gap-2">
            <Link
              to="dishes"
              spy={true}
              smooth={true}
              duration={500}
              className="hover:text-brightColor transition-all cursor-pointer"
            >
              Signature Dishes
            </Link>
            <Link
              to="menu"
              spy={true}
              smooth={true}
              duration={500}
              className="hover:text-brightColor transition-all cursor-pointer"
            >
              Premium Menu
            </Link>
          </nav>
        </div>
        <div>
          <h1 className="font-bold text-xl pb-4 pt-5 md:pt-0 text-normalText">
            Connect With Us
          </h1>
          <nav className="flex flex-col gap-2">
            <a
              href="mailto:oli.cste10@gmail.com"
              className="hover:text-brightColor transition-all cursor-pointer"
            >
              oli.cste10@gmail.com
            </a>
            <a
              href="tel:+8801720235330"
              className="hover:text-brightColor transition-all cursor-pointer"
            >
              +88 01720 235 330
            </a>
            <div className="flex justify-center gap-4 pt-2">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-brightColor hover:scale-110 transition-all cursor-pointer"
              >
                <BsFacebook size={20} />
              </a>
              <a
                href="https://x.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-brightColor hover:scale-110 transition-all cursor-pointer"
              >
                <RiTwitterXFill size={20} />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-brightColor hover:scale-110 transition-all cursor-pointer"
              >
                <BsInstagram size={20} />
              </a>
            </div>
          </nav>
        </div>
      </div>
      <div>
        <p className="text-center py-4 text-sm">
          © <span className="text-brightColor">SavoryGrid</span>{" "}
          {new Date().getFullYear()} | Crafted with passion, served with pride
        </p>
      </div>
    </div>
  );
};

export default Footer;