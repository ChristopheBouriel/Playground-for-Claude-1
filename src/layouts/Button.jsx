// Button.jsx
import React from "react";

const Button = ({ title, onClick, whatsapp, itemName }) => {
  const handleClick = () => {
    if (whatsapp) {
      const phone = "8801720235330"; // Replace with your WhatsApp number
      const message = `I want to ${title.toLowerCase()} ${
        itemName ? itemName : ""
      } from SavoryGrid`;
      window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`);
    } else if (onClick) {
      onClick();
    }
  };

  return (
    <button
      onClick={handleClick}
      className="px-6 py-1 border-2 border-brightColor text-brightColor hover:bg-brightColor hover:text-white transition-all rounded-full"
    >
      {title}
    </button>
  );
};

export default Button;