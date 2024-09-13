import React, { useContext,useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { useOutletContext } from 'react-router-dom'
import { createUser } from '../api'
import RegisterForm from '../components/RegisterForm'
import { getUser } from '../api'
// import api from '@/api'

export default function RegisterPage() {
	const {login} =useOutletContext();
	const navigate = useNavigate()
  
	
	// const handleRegister = async userData => {
	// 	const resp = await api.registerUser(userData)
	// 	if (resp.status == "ok") {
	// 		const loginResp = await api.loginUser(userData)
	// 		if (loginResp.status == "ok") {
	// 			setUser(api.getUser())
	// 			await api.createUserCart(cart.products.map(p => ({
	// 				productID: p.id, 
	// 				quantity: p.quantity
	// 			})))

	// 			if (cart.products.length) {
	// 				navigate("/cart")
	// 			} else {
	// 				navigate("/account")
	// 			}
	// 		}
	// 	}
	// 	return resp
	// }

	
 const handleRegister=async(event)=>{
   const response=await createUser(event);
   if(response.status===200){
     const data=await getUser(response.User_Id);

       login(data);
    
     navigate('/');
   }
 }
	return (
		<main 
			className="flex justify-center h-screen items-center bg-cover bg-center sm:bg-left"
	
		>
			<div className="min-w-sm p-6 rounded-lg bg-white filter drop-shadow-2xl">
				<h3 className="text-2xl font-bold text-center mb-6">Create a new account</h3>
				<RegisterForm onSubmit={handleRegister}/>
			</div>
		</main>
	)
}