import { useState } from "react";
import MenuItem from "./MenuItem";
import menuData from "../menuData";

export default function MenuDisplay({ cart, setCart }) {
  const [selectedCategory, setSelectedCategory] = useState(menuData[0]);
  const [activeCategory, setActiveCategory] = useState(
    selectedCategory.category
  );

  const handleQuantityChange = (itemId, delta) => {
    setSelectedCategory((prevCategory) => {
      const updatedItems = prevCategory.items.map((item) =>
        item.id === itemId
          ? { ...item, quantity: Math.max(item.quantity + delta, 0) }
          : item
      );
      return { ...prevCategory, items: updatedItems };
    });
  };

  const handleAddToCart = (item) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((cartItem) => cartItem.id === item.id);
      const newQuantity = item.quantity > 0 ? item.quantity : 1; // Default to 1 if quantity is not set

      if (existingItem) {
        return prevCart.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + newQuantity }
            : cartItem
        );
      } else {
        return [...prevCart, { ...item, quantity: newQuantity }];
      }
    });

    // Reset item quantity after adding to cart
    item.quantity = 0;
  };

  const handleCategoryClick = (category) => {
    setActiveCategory(category.category); // Set active category by its name
    setSelectedCategory(category); // Set selected category data
  };

  return (
    <div className="flex gap-[50px] w-full">
      {/* Categories */}
      <div className="flex flex-col gap-[30px] w-[15%]">
        {menuData.map((cat) => (
          <div
            key={cat.category}
            className={`p-[20px] cursor-pointer border-[2px] border-solid border-[#4F200D] rounded-2xl shadow-md ${
              activeCategory === cat.category ? "bg-[#FFD93D]" : "bg-[#F6F1E9]"
            }`}
            onClick={() => handleCategoryClick(cat)}
          >
            <h1 className="text-[26px] font-medium">{cat.category}</h1>
            <h3 className="text-[18px] font-light">{cat.items.length} items</h3>
          </div>
        ))}
      </div>

      {/* MenuItems */}
      <div className="w-[70%]">
        {selectedCategory ? (
          <div className="grid grid-cols-3 w-full gap-[50px]">
            {selectedCategory.items.map((item) => (
              <MenuItem
                key={item.id}
                item={item}
                onIncrease={(id) => handleQuantityChange(id, 1)}
                onDecrease={(id) => handleQuantityChange(id, -1)}
                onAddToCart={handleAddToCart}
              />
            ))}
          </div>
        ) : (
          <p>Select a category to view items</p>
        )}
      </div>
    </div>
  );
}
