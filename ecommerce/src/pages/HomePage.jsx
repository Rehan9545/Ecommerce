
import {Link} from "react-router-dom"
import '../styles/tailwind.css'
import {getAllCategories} from "../api.js";
import CategoryCard from "../components/CategoryCard"
import { useEffect, useState } from "react";
export default function HomePage(){
const [categories,setCatgeroies]=useState([]);
const fetchCategories= async ()=>{
    const response =await getAllCategories();
    const newData=  response.map(category=>({image:category.img_address,title:category.category_name}));
    setCatgeroies(newData)
}
useEffect(()=>{
   fetchCategories();   
 
},[])

    return (
        <>
    {/* <Container>
       <div className="flex flex-wrap justify-center items-center">
                   {
                    categoris.map(category=>(
                     <Link to={}>

                     </Link>
                    ))
                   }
       </div>

    </Container> */}
     <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {categories.map((category,index)=>(
            <CategoryCard
                key={index}
                image={category.image}
                title={category.title}
                link={"/products?category="+category.title}
            />
        ))

        }

     </div>
  

        </>
    )
}