import axios from "axios";
import { userLogin,	getAuthStatus, logoutUser, userSignup } from "../../services/api";
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null);
	const [isLoggedIn, setIsLoggedIn] = useState(false);

	useEffect(() => {
		const checkAuthStatus = async () => {
			try {
				console.log('Fetching auth status from:', axios.defaults.baseURL + '/user/auth-status');
				const data = await getAuthStatus();
				if (data) {
					setUser({ email: data.email, name: data.name });
					setIsLoggedIn(true);
				}
			} catch (err) {
				console.error("Auth status check failed:", err.message);
			}
		};
		checkAuthStatus();
	}, []);

	const login = async (email, password) => {
		const data = await userLogin(email, password);
		if (data) {

			// localStorage.setItem("token", data.token);

			setUser({ email: data.email, name: data.name });
			setIsLoggedIn(true);
		}
	};

	const signup = async (name, email, password) => {
		await userSignup(name, email, password);
	};

	const logout = async () => {
		await logoutUser();
		setIsLoggedIn(false);
		setUser(null);
		window.location.reload();
	};

	const value = {
		user,
		isLoggedIn,
		login,
		logout,
		signup,
	};

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
