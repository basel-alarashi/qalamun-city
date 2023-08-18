import React, {useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import Navbar from './Navbar';

const Register = () => {
	const [state, setState] = useState({
		username: '',
		email: '',
		password1: '',
		password2: ''
	});

	const {username, email, password1, password2} = state;

	const navigate = useNavigate();

	const onChange = (e) => {
		setState({
			...state,
			[e.target.name]: e.target.value
		});
	};

	const onSubmit = (e) => {
		e.preventDefault();
		if(password1 !== password2){
			toast.error("Your Passwords Didn't Match!");
		} else{
			const config = {
				headers: {
					'Content-Type': 'application/json'
				}
			};
			const body = JSON.stringify({username, email, password: password1});
			axios.post(
				'http://127.0.0.1:8000/api/register/', body, config
			).then(res => {
				navigate('/login');
			}).catch(error => toast.error(error));
		}
	};

	return (
		<div>
			<Navbar />
			<div className="reg-main">
				<img className="reg-img" src="/frontend/build/media/images/register.jfif" alt="register" />
				<div className="form-container">
					<h1>Sign Up</h1>
					<form className="reg-form" onSubmit={e => onSubmit(e)}>
						<input onChange={e => onChange(e)} 
						className="reg-input" 
						autoComplete="off" 
						type="text" 
						name="username" 
						placeholder="Name*" />
						<input onChange={e => onChange(e)} 
						className="reg-input" 
						autoComplete="off" 
						type="email"
						name="email" 
						placeholder="Email*" />
						<input onChange={e => onChange(e)} 
						className="reg-input" 
						autoComplete="off" 
						type="password" 
						name="password1" 
						placeholder="Password*" />
						<input onChange={e => onChange(e)} 
						className="reg-input" 
						autoComplete="off" 
						type="password" 
						name="password2" 
						placeholder="Confirm Password*" />
						<button className="reg-btn">Submit</button>
					</form>
					<Link className="reg-link" to="/login">Already have an account?</Link>
				</div>
			</div>
		</div>
	);
};

export default Register;