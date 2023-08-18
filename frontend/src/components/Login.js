import React, {useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import Navbar from './Navbar';

const Login = () => {
	const [state, setState] = useState({
		username: '',
		password: ''
	});

	const {username, password} = state;

	const onChange = (e) => {
		setState({
			...state,
			[e.target.name]: e.target.value
		});
	};

	function getCookie(name) {
	    let cookieValue = null;
	    if (document.cookie && document.cookie !== '') {
	        const cookies = document.cookie.split(';');
	        for (let i = 0; i < cookies.length; i++) {
	            const cookie = cookies[i].trim();
	            // Does this cookie string begin with the name we want?
	            if (cookie.substring(0, name.length + 1) === (name + '=')) {
	                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
	                break;
	            }
	        }
	    }
	    return cookieValue;
	}

	const csrftoken = getCookie('csrftoken');

  	const navigate = useNavigate();

	const onSubmit = (e) => {
		e.preventDefault();
		const config = {
			headers: {
				'Content-Type': 'application/json',
				'X-CSRFToken': csrftoken
			}
		};
		const body = JSON.stringify({username, password});
		axios.post(
			'http://127.0.0.1:8000/api/login/', body, config
		).then(res => {
			navigate("/");
		}).catch(error => toast.error("Error!"));
	};

	return (
		<div>
			<Navbar />
			<div className="reg-main">
				<img className="reg-img" src="/frontend/build/media/images/login.jfif" alt="login" />
				<div className="form-container">
					<h1>Log In</h1>
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
						type="password" 
						name="password" 
						placeholder="Password*" />
						<button className="reg-btn">Submit</button>
					</form>
					<Link className="reg-link" to="/register">Don't have an account?</Link>
				</div>
			</div>
		</div>
	);
};

export default Login;