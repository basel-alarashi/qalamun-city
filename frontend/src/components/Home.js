import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import Navbar from './Navbar';

const Home = () => {
	const [sports, setSports] = useState([]);

	const getSports = () => {
		axios.get('http://127.0.0.1:8000/api/')
		.then(res => setSports(res.data))
		.catch(error => toast.error(error));
	};

	useEffect(getSports, []);

	return (
		<div>
			<Navbar />
			<h1>5% sales for every participate 😍</h1>
			<div className="home-main">
				{sports.map(s => (
					<Link key={s.id} to={`/sports/${s.name}`} className="home-content">
						<img className="home-img" src={`../../${s.image}`} alt="sport" />
						<h6 className="home-name">Sport: {s.name}</h6>
						<h6 className="home-name">Fee: {s.fee}</h6>
					</Link>
				))}
			</div>
		</div>
	);
};

export default Home;