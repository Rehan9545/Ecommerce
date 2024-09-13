import axios from 'axios';



async function getAllCategories(){    
    const response = await axios.get('http://localhost:5000/categories');
    return response.data;
}
async function getProducts(){
    const response = await axios.get("http://localhost:5000/products");
    return response.data;
}
async function getSpecificProducts(category){
    console.log(category);
    const response = await axios.get(`http://localhost:5000/products/${category}`);
    return response.data;
}
async function verifyLogin({email,password}){
   const data={email,password}
   const response =await axios.post("http://localhost:5000/login",data);
   return response.data;
}
async function createUser(props){
   const response = await axios.post("http://localhost:5000/register",props);
   return response.data;
}
async function getUser(props){
    const data={User_Id:props};
  
    const response = await axios.post("http://localhost:5000/user",data);

    return response.data;
}
async function placeOrder(cart,auth){
    console.log({cart,"User_Id":auth.user.User_Id})
    const response= await axios.post("http://localhost:5000/placeorder",{cart,"User_Id":auth.user.User_Id})
    return response.data;

}
async function getOrders(id){
    
    const response = await axios.get("http://localhost:5000/orders",{params:{id}});
    return response.data;
}
export {getAllCategories,getProducts,getSpecificProducts,verifyLogin,createUser,getUser,placeOrder,getOrders}