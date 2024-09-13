import { Outlet } from "react-router-dom"
import { useState } from "react";
import Navbar from "../components/NavBar"
export default function UserLayout(){
    const [auth,setAuth]=useState({isLoggedIn:false,user:null});
    const [cart,setCart]=useState([]);
    const login =(user)=>{
      console.log(user);
      setAuth({isLoggedIn:true,user})
    };
    const logout=()=>{
      setAuth({isLoggedIn:false,user:null})
    };
    // const addCart=(item)=>{
    //   console.log(item);
    //   setCart((prevCart)=>[...prevCart,item]);
      
    //   console.log(cart);
    // }
      
    const addCart = (item) => {
      setCart(prevCart => {
        // Check if the item is already in the cart
    const itemIndex = prevCart.findIndex(cartItem => cartItem.id === item.id);
        
        if (itemIndex > -1) {
          // Item is already in the cart, increase its quantity
          return prevCart.map((cartItem, index) =>
            index === itemIndex
              ? { ...cartItem, quantity: cartItem.quantity + 1 }
              : cartItem
          );
        } else {
          // Item is not in the cart, add it with a quantity of 1
          return [...prevCart, { ...item, quantity: 1 }];
        }
      });
      console.log(cart);
    }
  

    const clearCart=()=>{
        setCart([]);
    };
    return(
        <>
          <Navbar auth={auth} logout={logout}/>
          <Outlet  context={{auth,login,logout,addCart,cart,clearCart}}/>
        </>
    )
}