import { useEffect, useState } from "react"
import ProductCard from "../components/ProductCard"
import { useLocation } from "react-router-dom"
import { getProducts,getSpecificProducts } from "../api"
import { useOutletContext } from "react-router-dom"
export default function ProductsPage(){
    const query = new URLSearchParams(useLocation().search)
    const {addCart} = useOutletContext();
    const category = query.get("category")
    const [products,setProducts]=useState([]);
    const addToCart=(props)=>{
        alert("added to cart");
        addCart(props);
        // console.log(props);
    }
    const fetchProducts= async ()=>{
    if(category){
        const response=await getSpecificProducts(category);
        const newData= response.map(product=>({id:product.product_id,image:product.img_address,name:product.product_name,price:product.product_price}));
        setProducts(newData);
    }else{
        const response=await getProducts();
        const newData= response.map(product=>({id:product.product_id,image:product.img_address,name:product.product_name,price:product.product_price}));
        setProducts(newData);   
    }
   
  
    }
    useEffect(()=>{
     fetchProducts();
    },[])
             
         
    return (
 <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
     {products.map((product,index)=>(
        <ProductCard
        key={index}
        image={product.image}
        title={product.name}
        price={product.price}
        addToCart={()=>addToCart(product)}
         />
     ))}

 </div>
    )
}