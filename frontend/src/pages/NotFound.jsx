import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
	return (
		<div style={styles.container}>
			<h1 style={styles.code}>404</h1>
			<h2 style={styles.message}>Page Not Found</h2>
			<p style={styles.text}>
				The page you're looking for doesn't exist or has been moved.
			</p>
			<Link to='/' style={styles.link}>
				Go back to Home
			</Link>
		</div>
	);
};

const styles = {
	container: {
		textAlign: 'center',
		padding: '4rem',
		color: '#333',
	},
	code: {
		fontSize: '6rem',
		margin: 0,
	},
	message: {
		fontSize: '2rem',
		marginBottom: '1rem',
	},
	text: {
		marginBottom: '2rem',
		fontSize: '1rem',
	},
	link: {
		textDecoration: 'none',
		color: '#007bff',
		fontWeight: 'bold',
	},
};

export default NotFound;
