import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import Navbar from './Navbar';

const CreateParticipant = () => {
	const [participant, setParticipant] = useState({
		phone: '',
		length: 0,
		weight: 0,
		sexuality: '',
		sick: false
	});

	const {phone, length, weight, sexuality, sick} = participant;

	const navigate = useNavigate();

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

	const onChange = (e) => {
		setParticipant({
			...participant,
			[e.target.name]: e.target.value
		});
	};

	const handleCheckbox = (e) => {
		setParticipant({
			...participant,
			sick: e.target.checked
		});
	};

	const onSubmit = (e) => {
		e.preventDefault();
		const config = {
			headers: {
				'Content-Type': 'application/json',
				'X-CSRFToken': csrftoken
			}
		};
		const body = JSON.stringify({phone, length, weight, sexuality, sick});
		axios.post(
			'http://127.0.0.1:8000/api/create-participant/', body, config
		).then(res => {
			navigate('/');
		}).catch(error => {
			navigate('/error');
		});
	};

	return (
		<div>
			<Navbar />
			<div className="diet-main">
				<h1>Fill your Participant Profile</h1>
				<form className="diet-main" onSubmit={e => onSubmit(e)}>
					<input
					autoComplete="off" 
					placeholder="Phone Number" 
					className="reg-input" 
					type="text" name="phone" 
					onChange={e => onChange(e)} />
					<input
					autoComplete="off" 
					placeholder="Length (cm)"
					className="reg-input" 
					type="number" 
					name="length" 
					onChange={e => onChange(e)} />
					<input
					autoComplete="off" 
					placeholder="Weight (kg)" 
					className="reg-input" 
					type="number" 
					name="weight" 
					onChange={e => onChange(e)} />
					<input
					autoComplete="off" 
					placeholder="Sexuality (male / female)" 
					className="reg-input" 
					type="text" 
					name="sexuality" 
					onChange={e => onChange(e)} />
					<div className="check-container">
						<label htmlFor="check">Have any Diseases:</label>
						<input type="checkbox" id="check" name="sick" onChange={(e) => handleCheckbox(e)} />
					</div>
					<button className="reg-btn">Create</button>
				</form>
			</div>
			</div>
	);
};

export default CreateParticipant;