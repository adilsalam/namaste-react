import { useDispatch, useSelector } from "react-redux";
import ItemList from "./ItemList";
import { clearCart } from "../utils/cartSlice";

const Cart = () => {
  const cartItems = useSelector((store) => store.cart.items);

  const dispatch = useDispatch();
  const handleClearCart = () => {
    dispatch(clearCart());
  };

  return (
    <div className="m-5 p-5 text-center">
      <div className="font-bold text-2xl  p-4">Cart</div>

      <button
        className="bg-red-400 mb-3 text-white px-2 py-1 rounded-md"
        onClick={handleClearCart}
      >
        Clear Cart
      </button>
      {cartItems.length === 0 && <h1>Cart is empty. Add items to continue</h1>}
      <div className="w-6/12 m-auto p-4 rounded-lg">
        {cartItems.map((item, index) => (
          <ItemList key={item?.card?.info?.id * index} itemData={item} />
        ))}
      </div>
    </div>
  );
};

export default Cart;
