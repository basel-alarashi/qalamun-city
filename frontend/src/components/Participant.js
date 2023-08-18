import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import Navbar from './Navbar';

const Participant = () => {
	const [me, setMe] = useState({
	    id: 0,
	    phone: "",
	    length: 0,
	    weight: 0,
	    sexuality: "",
	    sick: false,
	    joined_at: "",
	    user: "",
	    sport: [],
	    email: ""
	});

	const navigate = useNavigate();

	const getDetails = () => {
		axios.get('http://127.0.0.1:8000/api/my-details/')
		.then(res => {
			setMe(res.data);
		}).catch(error => {
			navigate('/error');
		});
	};

	useEffect(getDetails, [navigate]);

	return (
		<div>
			<Navbar />
			<div className="sport-main">
				<h1>{me.user}</h1>
				<div className="author">
					<a className="reg-link" href={me.email}>{me.email}</a>
					<p>Joined at: {me.joined_at}</p>
				</div>
				<div className="sport-content">
					<p>Weight: {me.weight}</p>
					<p>Length: {me.length}</p>
					<p>Sexuality: {me.sexuality}</p>
					<p>Sick: {me.sick.toString()}</p>
					<p>Phone Number: {me.phone}</p>
					<p>Sports: {me.sport.map(s => (
						s + ', '
					))}</p>
				</div>
			</div>
		</div>
	);
};

export default Participant;