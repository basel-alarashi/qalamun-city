import React, {useState, useEffect} from 'react';
import {useParams, useNavigate} from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import Navbar from './Navbar';

const Sport = () => {
	const [sport, setSport] = useState({
	    id: 1,
	    name: "",
	    fee: "",
	    image: "",
	    participants: 0,
	    participates: 0
	});

	const {name} = useParams();

	const navigate = useNavigate();

	const actualFee = sport.fee - (sport.participates * 0.05 * sport.fee);

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

	const getDetails = () => {
		axios.get(`http://127.0.0.1:8000/api/sports/${name}`)
		.then(res => {
			setSport(res.data)
		}).catch(error => {
			navigate('/error');
		});
	};

	useEffect(getDetails, [name, navigate]);

	const handleClick = () => {
		const config = {
			headers: {
				'Content-Type': 'application/json',
				'X-CSRFToken': csrftoken
			}
		};
		const body = JSON.stringify({name});
		axios.post('http://127.0.0.1:8000/api/participate/', body, config)
		.then(res => {
			navigate('/');
		}).catch(error => toast.error("May be you Don't have Participant Profile."));
	};

	return (
		<div>
			<Navbar />
			<div className="sport-main">
				<h1>{name}</h1>
				<img className="home-img" alt="sport" src={`../../${sport.image}`} />
				<div className="sport-content">
					<p>Number of Participants: {sport.participants}</p>
					<p>Fee for participate: {actualFee}</p>
				</div>
				<button onClick={handleClick} className="reg-btn">Participate</button>
			</div>
		</div>
	);
};

export default Sport;