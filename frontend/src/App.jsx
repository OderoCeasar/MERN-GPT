import React, { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/shared/Header";
import { useAuth } from "./context/AuthContext";
import styles from './App.module.css';


const Home = lazy(() => import("./pages/Home"));
const Login = lazy(() => import("./pages/Login"));
const Signup = lazy(() => import("./pages/Signup"));
const Chat = lazy(() => import("./pages/Chat"));

function App() {
	const auth = useAuth();

	return (
		<div>
			<Header />
			<main className={styles.routes}>
	
				<Suspense fallback={<div className="text-center p-4">Loading...</div>}>
					<Routes>
						<Route path='/' element={<Home />} />
						<Route path='/login' element={<Login />} />
						<Route path='/signup' element={<Signup />} />
						
						<Route
							path='/chat'
							element={
								auth?.isLoggedIn ? <Chat /> : <Login />
							}
						/>
					</Routes>
				</Suspense>
			</main>
		</div>
	);
}

export default App;
