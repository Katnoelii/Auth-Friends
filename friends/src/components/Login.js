import React, { useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import Loader from "react-loader-spinner";

export default function Login(props) {
	const [credentials, setCredentials] = useState({
		username: "",
		password: "",
	});
	const [isLoading, setIsLoading] = useState(false);
	const { history } = props;
	const { handleSubmit, register, errors, setError } = useForm();

	const onSubmit = (values) => {
		setIsLoading(true);
		axios
			.post("http://localhost:5000/api/login", values)
			.then((res) => {
				localStorage.setItem("token", res.data.payload);
				history.push("/friends");
			})
			.catch((err) => console.log(err));
	};

	const handleChange = (evt) => {
		setCredentials({ ...credentials, [evt.target.name]: evt.target.value });
	};

	return (
		<div className="Login-Div">
			<form onSubmit={handleSubmit(onSubmit)}>
				<label htmlFor="username">Username</label>
				<input
					className="form-control"
					name="username"
					type="username"
					id="username"
					onChange={handleChange}
					ref={register({
						required: "Required",
					})}
				/>
				<span>{errors.email && errors.email.message}</span>
				<label htmlFor="password">Password</label>
				<input
					className="form-control"
					type="password"
					name="password"
					id="password"
					onChange={handleChange}
					ref={register({
						required: "Required",
						validate: (value) => value !== "password" || "Use a better password",
					})}
				/>
				<span>{errors.password && errors.password.message}</span>

				{!isLoading && (
					<>
						<button type="submit">Login</button>
						<button onClick={() => history.push("/login")}>Sign Up</button>
					</>
				)}
			</form>
			{isLoading && <Loader type="Grid" color="#00BFFF" height={50} width={50} />}
		</div>
	);
}