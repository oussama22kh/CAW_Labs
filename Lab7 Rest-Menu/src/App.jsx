import { useState } from "react";
import "./App.css";
import NavBar from "./Components/NavBar";
import MenuDisplay from "./Components/MenuDisplay";
import Cart from "./Components/Cart";

function App() {
  const [cartVisible, setCartVisible] = useState(false); // Controls visibility of Cart
  const [cart, setCart] = useState([]); // Shared cart state

  const toggleCartSidebar = () => {
    setCartVisible(!cartVisible);
  };

  return (
    <div className="font-bai px-[250px] bg-[#F6F1E9] h-screen">
      <NavBar onCartClick={toggleCartSidebar} cart={cart} />

      <main>
        <MenuDisplay cart={cart} setCart={setCart} />
        <Cart
          isVisible={cartVisible}
          onClose={toggleCartSidebar}
          cart={cart}
          setCart={setCart}
        />
      </main>
    </div>
  );
}

export default App;
