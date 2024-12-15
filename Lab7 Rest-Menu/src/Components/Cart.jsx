const Cart = ({ isVisible, onClose, cart, setCart }) => {
  const handleOrderClick = () => {
    setCart([]); // Clear the cart
    onClose(); // Close the cart when the order is placed
  };

  return (
    <div
      className={`fixed right-0 top-0 bg-[#F6F1E9] w-[300px] h-full shadow-lg p-4 transform ${
        isVisible ? "translate-x-0" : "translate-x-full"
      } transition-transform duration-300`}
    >
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-2xl font-bold"
      >
        &times;
      </button>
      <h2 className="text-2xl mb-4">Cart</h2>
      <ul>
        {cart.map((item) => (
          <li key={item.id} className="flex justify-between items-center mb-4">
            <span>
              {item.name} - {item.quantity} x ${item.price}
            </span>
            <span>${item.quantity * item.price}</span>
          </li>
        ))}
      </ul>
      <div className="flex justify-between mt-4">
        <span>Total:</span>
        <span>
          ${cart.reduce((total, item) => total + item.quantity * item.price, 0)}
        </span>
      </div>
      <button
        onClick={handleOrderClick}
        className="mt-4 w-full bg-[#FFD93D] text-[#4F200D] p-2 rounded-lg"
      >
        Order
      </button>
    </div>
  );
};

export default Cart;
