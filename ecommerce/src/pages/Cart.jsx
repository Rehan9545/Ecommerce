import React from 'react';
import { useOutletContext } from 'react-router-dom';
import { placeOrder } from '../api';
import { useNavigate } from 'react-router-dom';
const Cart = ({ products }) => {
  // Calculate the total price
  const {cart,auth,clearCart} = useOutletContext();
  const navigate=useNavigate();
  const totalPrice = cart.reduce((total, product) => total + product.price, 0);
  const handlePlaceOrder=async()=>{
           const data=await placeOrder(cart,auth);
           if(data.status===200){
            clearCart();
                navigate("/cart/success");
           }
  }

  return (
    <div className="p-4 max-w-lg mx-auto bg-white shadow-lg rounded-lg mt-20">
      <h2 className="text-xl font-bold mb-4">Your Cart</h2>
      <ul>
        {cart.map((product, index) => (
          <li key={index} className="flex justify-between py-2 border-b">
            <span className="font-medium">{product.name}</span>
            <span className="text-gray-500">x{product.quantity}</span>
            <span className="text-gray-500">Rs. {product.price.toFixed(2)}</span>
          </li>
        ))}
      </ul>
      <div className="flex justify-between font-bold mt-4">
        <span>Total</span>
        <span>Rs. {totalPrice.toFixed(2)}</span>
      </div>
      <button className="w-full mt-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600" onClick={handlePlaceOrder} disabled={cart.length===0}>
        Checkout
      </button>
    </div>
  );
};
 
export default Cart;