import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { FriendsContext } from "../context/FriendsContext";

const initialFormValues = {
	name: "",
	age: "",
	email: "",
};

export default function AddFriend() {
	const [formValues, setFormValues] = useState(initialFormValues);
	const { postNewFriend } = useContext(FriendsContext);
	const history = useHistory();

	const onInputChange = (event) => {
		const { name } = event.target;
		const { value } = event.target;
		setFormValues({ ...formValues, [name]: value });
	};

	const onSubmit = (event) => {
		event.preventDefault();
		const newFriend = {
			name: formValues.name,
			age: formValues.age,
			email: formValues.email,
			id: Date.now(),
		};
		postNewFriend(newFriend);
		setFormValues(initialFormValues);
		history.push("/friends");
	};

	return (
		<form onSubmit={onSubmit}>
			<h2>Add a New Friend!</h2>

			<label>
				Name:&nbsp;
				<input
					type="text"
					placeholder="..."
					maxLength="30"
					name="name"
					value={formValues.name}
					onChange={onInputChange}
				/>
			</label>
			<label>
				Age:&nbsp;
				<input
					type="text"
					name="age"
					placeholder="..."
					maxLength="50"
					value={formValues.age}
					onChange={onInputChange}
				/>
			</label>
			<label>
				Email:&nbsp;
				<input
					type="text"
					name="email"
					placeholder="..."
					maxLength="50"
					value={formValues.email}
					onChange={onInputChange}
				/>
			</label>

			<button>Submit</button>
		</form>
	);
}