import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

import bot2 from "/page-photos/robot-2.png";

import PageImage from "../components/auth/PageImage";
import FormLabel from "../components/auth/FormLabel";
import Button from "../components/shared/Button";

import styles from "./AuthForm.module.css";

import axios from "axios";
axios.defaults.baseURL = import.meta.env.REACT_APP_API_URL || "http://localhost:5000/api";
axios.defaults.withCredentials = true;

import { useAuth } from "../context/AuthContext";

const Login = () => {
	const [buttonName, setButtonName] = useState("Login");

	const navigate = useNavigate();
	const auth = useAuth();

	const handleSubmit = async (event) => {
		event.preventDefault();

		const formData = new FormData(event.currentTarget);
		const email = formData.get("email");
		const password = formData.get("password");

		try {
			setButtonName("Loading ...");
			toast.loading("Signing in ..", { id: "login" });
			await auth?.login(email, password);
			setButtonName("Login");
			toast.success("Signed in successfully", { id: "login" });
			navigate("/chat");
		} catch (error) {
			setButtonName("Login");
			toast.error(error.message, { id: "login" });
			console.log(error, "error");
		}
	};

	return (
		<div className={styles.parent}>
			<div>
				<PageImage
					src={bot2}
					alt='login chat bot image'
					className={styles.image}
				/>
			</div>
			<div>
				<h2>Log Into Your Account</h2>
				<form className={styles.form} onSubmit={handleSubmit}>
					<FormLabel
						className={styles.auth_label}
						htmlFor='email'
						id='email'
						name='email'
						type='text'
						required={true}
						maxLength={100}
						minLength={5}
						label='Email address'
						onChange={() => {}}
						inputPH='Enter your email'
					/>

					<FormLabel
						className={styles.auth_label}
						htmlFor='Password'
						id='password'
						name='password'
						type='password'
						required={true}
						maxLength={16}
						minLength={8}
						label='Password'
						onChange={() => {}}
						inputPH='Password'
					/>

					<Button
						buttonLabel={buttonName}
						type='submit'
						className={styles.button}
					/>
				</form>
				<p>
					Don't have an account? <Link to='/signup'>Create One</Link> now{" "}
				</p>
			</div>
		</div>
	);
};

export default Login;
