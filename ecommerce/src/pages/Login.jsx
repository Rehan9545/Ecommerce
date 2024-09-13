import { useEffect } from "react";
import LoginForm from "../components/LoginForm";
import { verifyLogin } from "../api";
import { useNavigate } from 'react-router-dom'
import { getUser } from "../api";
import { useOutletContext } from "react-router-dom";
export default function Login(){
    const navigate=useNavigate();
    const {login}=useOutletContext();   
  const handleLogin =async (event)=>{
    // event.preventDefault();
//    console.log(event);
   const data=await verifyLogin(event);
   if(data.status===200){
    const userData=await getUser(data.UserId); 
    localStorage.setItem('user',[{userData}]);
    login(userData);    
   
    navigate("/");
   }
   
  }
    return (
        <main 
			className="flex justify-center h-screen items-center bg-cover bg-center sm:bg-left"
			
		>
			<div className="min-w-sm p-6 rounded-lg bg-white filter drop-shadow-2xl">
				<h3 className="text-2xl font-bold text-center mb-6">Login to your account</h3>
				<LoginForm onSubmit={handleLogin} />

			</div>
		</main>
    )
}