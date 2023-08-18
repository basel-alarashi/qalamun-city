import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import Navbar from './Navbar';

const Diet = () => {
	const [participant, setParticipant] = useState({
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
			setParticipant(res.data);
		}).catch(error => {
			navigate('/error');
		});
	};

	useEffect(getDetails, [navigate]);

	return (
		<div>
			<Navbar />
			<div className="diet-main">
				<div className="diet-header">
					<h1>Diet</h1>
					<h5>Here is your Proper Diet</h5>
					<p>Weight: {participant.weight}</p>
					<p>Lenght: {participant.length}</p>
					<p>Sexuality: {participant.sexuality}</p>
				</div>
				<div className="diet-decided">
					<h1>Diet Decided</h1>
					{(participant.sexuality === "male")? (
						(participant.length - 100 > participant.weight)? (
							<h5>
								Breakfast: 3 pcs of Waffle completely made of floor, two big spoons of Peanut Butter, 1 Orange and 2 cups of Milk<br />
								Snack (1): 1 pc of Granula with nuts and 28g of almonds.<br />
								Lunch: 170g of low fat Burger with tomato and lettuce, In addition to 1.5 cup of French Fries.<br />
								Snack (2): Cup of Greek yogurt or any other type of yogurt with adding Strawberry or any other available type of fruit.<br />
								Dinner: 112g of chicken breast and half cup of Quinoa seeds, In addition to 85g of Peas.<br />
							</h5>
						): (
							<h5>
								Breakfast: Cup of tea, 3 pcs of biscuit. then, 1 pc of bread and 3 spoons of bean.<br />
								Snack (1): 1 Friut (of any type you want).<br />
								Lunch: 3 Spoons of rice + 2 slices of roast liver with plate of salad.<br />
								--note: you can substitute rice for pasta.<br />
								Snack (2): Plate of oats with honey.<br />
								Dinner: Cup of yogurt and 1 fruit.<br />
							</h5>
						)
					): (
						(participant.length - 100 > participant.weight)? (
							<h5>
								Breakfast: 80g of oats with 240g of Cow's milk, in addition to 1 banana and 2 spoons of Peanut Butter.<br />
								Snack (1): 80g of grains (Cornfalkes), in addition to 34g of dried fruit and 20 grains of nuts.<br />
								Lunch: 100g of pasta, 183g of tomato sauce with 112g of minced meat and 1 average size pc of bread.<br />
								Snack (2): 226g of Cottage cheese and 1 fruit (of any type).<br />
								Dinner: 110g of fish (or any protein source) in addition to 80g vegetables and 100g of rice.<br />
							</h5>
						): (
							<h5>
								Breakfast: Cup of oats, half cup of fat free milk, 1 honey spoon, half cup of Blueberry and cup of tea or coffee (sugar free).<br />
								Snack (1): 80g of Strawberry and 12 grains of almonds.<br />
								Lunch: 2 pcs of grain bread, 2 slices of chicken breast with tomato and lettuce, and one mustard spoon.<br />
								Snack (2): Half cup of yogurt with big honey spoon and 1 apple.<br />
								Dinner: 90g of grilled fish, 80g of pean, plate of salad, 5 pcs of cherry tomato and cup of water with lemon slices.<br />
							</h5>
						)
					)}
				</div>
			</div>
		</div>
	);
};

export default Diet;