import React, {useState, useEffect, Fragment} from 'react';
import {NavLink, Link, useNavigate} from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const Navbar = () => {
	const [auth, setAuth] = useState(false);

	const navigate = useNavigate();

	useEffect(() => {
		axios.get('http://127.0.0.1:8000/api/check/')
		.then(res => res.data)
		.then(data => {
			setAuth(data.auth);
		});
	}, [auth]);

	const logout = (e) => {
		axios.get('http://127.0.0.1:8000/api/logout/')
		.then(res => {
			setAuth(false);
			navigate('/');
		}).catch(error => {
			toast.error("Error with Checking User Status!");
		});
	};

	return (
		<div className="navbar">
			<Link className="logo" to="/">
				<img className="logo-img" src="/frontend/build/media/images/sports.png" alt="logo" />
				<p className="logo-text">Qalamun Sporting City</p>
			</Link>
			<div className="links">
				{auth? (
					<Fragment>
						<NavLink to="/my-details">My Details</NavLink>
						<NavLink to="/diet">Diet</NavLink>
						<NavLink to="/create-participant">Create Participant Profile</NavLink>
						<button onClick={e => logout(e)} className="logout-btn">Logout</button>
					</Fragment>
				): (
					<Fragment>
						<NavLink to="/register">Register</NavLink>
						<NavLink to="/login">Login</NavLink>
					</Fragment>
				)}
			</div>
		</div>
	);
};

export default Navbar;