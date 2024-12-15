import account from "../assets/account.png";
import cartpic from "../assets/cart.png";

export default function NavBar({ onCartClick, cart }) {
  // Calculate total items in the cart
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="flex justify-between items-center w-full h-[80px] mb-[100px]">
      <h1 className="text-[#4F200D] text-[48px] font-semibold">Caw Food</h1>
      <div className="flex gap-[30px] relative">
        <img src={account} className="w-[50px] h-[50px]" alt="Account Icon" />
        <button onClick={onCartClick} className="relative">
          <img src={cartpic} className="w-[50px] h-[50px]" alt="Cart Icon" />
          {/* Red dot badge */}
          {totalItems > 0 && (
            <span className="absolute top-0 right-0 bg-red-600 text-white text-[12px] font-bold rounded-full h-5 w-5 flex items-center justify-center">
              {totalItems}
            </span>
          )}
        </button>
      </div>
    </div>
  );
}
