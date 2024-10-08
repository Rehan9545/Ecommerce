import React, { useEffect, useState } from 'react'

import { Link } from "react-router-dom"
import { User, Mail, Lock, Phone } from "react-feather"
import Input from './Input';
import Button from './Button';

// import Alert from "@/components/Alert" 


export default function RegisterForm({ onSubmit }) {
	const [fullname, setFullname] = useState("")
	const [email, setEmail] = useState("")
	const [phone, setPhone] = useState("")
	const [password, setPassword] = useState("")
	const [confirmPassword, setConfirmPassword] = useState("")
	const [error, setError] = useState(null)
	const [loading, setLoading] = useState(false)

	const handleSubmit = async e => {
		e.preventDefault()
		if (password.length < 6) {
			setError("password must be atleast 6 characters")
			return
		}
		if (phone.length < 10) {
			setError("please enter 10 digit phone number")
			return
		}
		if (password !== confirmPassword) {
			setError("passwords don't match")
			return
		}
		setLoading(true)
		const resp = await onSubmit({fullname, email,phone, password, confirmPassword})
		setLoading(false)
		// if (resp.status == "error") {
		// 	setError(resp.message)
		// }
	}

	useEffect(() => {
		return () => {
			setLoading(false)
		}
	}, [])

	return (
		<form 
			onSubmit={handleSubmit}
			className="flex items-center flex-col space-y-2"
			>
			<Input 
				value={fullname}
				icon={<User width={20} height={20} />}
				onChange={e => setFullname(e.target.value)}
				type="text" placeholder="Full Name" required />
			<Input 						
				value={email}
				icon={<Mail width={20} height={20} />}
				onChange={e => setEmail(e.target.value)}
				type="email" placeholder="Email" required />
			<Input 						
				value={phone}
				icon={<Phone width={20} height={20} />}
				onChange={e => setPhone(e.target.value)}
				type="number" placeholder="Phone Number" required />
			<Input 
				value={password}
				icon={<Lock width={20} height={20} />}
				onChange={e => setPassword(e.target.value)}
				type="password" placeholder="Password" required />
			<Input
				value={confirmPassword}
				icon={<Lock width={20} height={20} />}
				onChange={e => setConfirmPassword(e.target.value)} 
				type="password" placeholder="Confirm Password" required />
			
			{/* {error && <Alert heading="Error!" body={error} danger />} */}

			<Button 
				className="w-full !mt-6 !text-base !rounded-full" 
				type="submit"
				disabled={loading}
			>
			    Register 
			</Button>
			
			<Link to="/login">
				<Button link>
					Already have an account?
				</Button>
			</Link>
		</form>
	)
}