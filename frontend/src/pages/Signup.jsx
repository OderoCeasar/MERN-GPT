import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";

import bot2 from "/page-photos/robot-2.png";

import PageImage from "../components/auth/PageImage";
import FormLabel from "../components/auth/FormLabel";
import Button from "../components/shared/Button";

import styles from "./AuthForm.module.css";
import { useAuth } from "../context/AuthContext";

// Axios defaults
axios.defaults.baseURL = import.meta.env.REACT_APP_API_URL || "http://localhost:5000/api";
axios.defaults.withCredentials = true;

const Signup = () => {
	const [buttonName, setButtonName] = useState("SignUp");
	const navigate = useNavigate();
	const auth = useAuth();

	const handleSubmit = async (event) => {
		event.preventDefault();

		const formData = new FormData(event.currentTarget);
		const username = formData.get("username");
		const email = formData.get("email");
		const password = formData.get("password");
		const confirmPassword = formData.get("confirm-password");

		if (password !== confirmPassword) {
			toast.error("Passwords do not match", { id: "signup" });
			setButtonName("SignUp");
			return;
		}

		try {
			setButtonName("Loading ...");
			toast.loading("Signing up ..", { id: "signup" });
			await auth?.signup(username, email, password);
			setButtonName("SignUp");
			toast.success("Account created! Please log in", { id: "signup" });
			navigate("/login");
		} catch (error) {
			setButtonName("SignUp");
			toast.error(error.message, { id: "signup" });
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
				<h2>Create New account</h2>
				<form className={styles.form} onSubmit={handleSubmit}>
					<FormLabel
						className={styles.auth_label}
						htmlFor='username'
						id='username'
						name='username'
						type='text'
						required={true}
						maxLength={25}
						minLength={2}
						label='Username'
						onChange={() => {}}
						inputPH='Enter your username'
					/>

					<FormLabel
						className={styles.auth_label}
						htmlFor='email'
						id='email'
						name='email'
						type='text'
						required={true}
						maxLength={50}
						minLength={5}
						label='Email address'
						onChange={() => {}}
						inputPH='Enter your email address'
					/>

					<FormLabel
						className={styles.auth_label}
						htmlFor='Password'
						name='password'
						id='password'
						type='password'
						required={true}
						maxLength={16}
						minLength={8}
						label='Password'
						onChange={() => {}}
						inputPH='Password'
					/>

					<FormLabel
						className={styles.auth_label}
						htmlFor='Confirm-Password'
						id='confirm-password'
						name='confirm-password'
						type='password'
						required={true}
						maxLength={16}
						minLength={8}
						label='Confirm Password'
						onChange={() => {}}
						inputPH='Confirm Password'
					/>

					<Button
						buttonLabel={buttonName}
						type='submit'
						className={styles.button}
					/>
				</form>
				<p>
					Already have an account ? <Link to='/login'>Login</Link> now
				</p>
			</div>
		</div>
	);
};

export default Signup;
