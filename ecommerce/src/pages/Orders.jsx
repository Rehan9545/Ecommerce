import { useEffect, useState } from "react"
import { getOrders } from "../api"
import { useOutletContext } from "react-router-dom";
export default function Orders (){
    const {auth} =useOutletContext();
    const [orders,setOrders]=useState([]);

    const fetchOrders=async()=>{

     const data=await getOrders(auth.user.User_Id);
     setOrders(data);
    }
  useEffect(()=>{
     fetchOrders();
  },[])
    return(
    
        orders.map(order=>(
            <div className="p-4 max-w-lg mx-auto bg-white shadow-lg rounded-lg mt-20">
            <h2 className="text-xl font-bold mb-4">Order ID : {order.Order_Id}</h2>
            <ul>
              {order.items.map((product, index) => (
                <li key={index} className="flex justify-between py-2 border-b">
                  <span className="font-medium">{product.product_name}</span>
                  <span className="text-gray-500">x{product.quantity}</span>
                  <span className="text-gray-500">Rs. {product.price.toFixed(2)}</span>
                </li>
              ))}
            </ul>
            <div className="flex justify-between font-bold mt-4">
              <span>Total</span>
              <span>Rs. {order.total_amount.toFixed(2)}</span>
            </div>
          </div>
        ))
    
    )
}