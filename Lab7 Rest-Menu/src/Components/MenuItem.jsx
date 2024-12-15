import React from "react";
import dish from "../assets/dish.webp";

const MenuItem = ({ item, onIncrease, onDecrease, onAddToCart }) => {
  return (
    <div className="flex flex-col justify-between items-center border-[2px] border-solid border-[#4F200D] p-[20px] rounded-2xl shadow-md gap-[10px]">
      <img src={dish} alt="" />
      <div>
        <span className="block">{item.name}</span>
        <span className="block text-sm text-gray-500">${item.price}</span>
      </div>
      <div className="flex items-center">
        <button
          onClick={() => onDecrease(item.id)}
          className="border-[2px] border-solid border-[#4F200D] text-[#4F200D] text-[22px] px-2 rounded"
        >
          -
        </button>
        <span className="mx-4">{item.quantity}</span>
        <button
          onClick={() => onIncrease(item.id)}
          className="border-[2px] border-solid border-[#4F200D] text-[#4F200D] text-[22px] px-2 rounded"
        >
          +
        </button>
      </div>
      <button
        onClick={() => onAddToCart(item)}
        className="bg-[#FF8400] text-[24px] text-black px-4 py-2 rounded-md ml-4"
      >
        Add to Cart
      </button>
    </div>
  );
};

export default MenuItem;
