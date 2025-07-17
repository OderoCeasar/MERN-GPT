const { hash, compare } = require("bcrypt");
const User = require("../models/user-model.js");
const { createToken } = require("../utils/token-manager.js");
const { COOKIE_NAME } = require("../utils/constants.js");

const getAllUsers = async (req, res, next) => {
	try {
		const users = await User.find();
		return res.status(200).json({ message: "OK", users });
	} catch (error) {
		console.error(error);
		return res.status(500).json({ message: "ERROR", cause: error.message });
	}
};

const userSignUp = async (req, res, next) => {
	try {
		const { name, email, password } = req.body;
		const existingUser = await User.findOne({ email });

		if (existingUser)
			return res.status(409).json({
				message: "ERROR",
				cause: "User with same email already exists",
			});

		const hashedPassword = await hash(password, 10);
		const user = new User({ name, email, password: hashedPassword });
		await user.save();

		// Clear old cookies
		res.clearCookie(COOKIE_NAME, {
			path: "/",
			httpOnly: true,
			signed: true,
		});

		// Create new token
		const token = createToken(user._id.toString(), user.email, "7d");
		const expires = new Date();
		expires.setDate(expires.getDate() + 7);

		res.cookie(COOKIE_NAME, token, {
			path: "/",
			expires,
			httpOnly: true,
			signed: true,
			secure: false,
			sameSite: "lax",
		});

		return res.status(201).json({ message: "OK", name: user.name, email: user.email });
	} catch (error) {
		console.error(error);
		return res.status(500).json({ message: "ERROR", cause: error.message });
	}
};

const userLogin = async (req, res, next) => {
	try {
		const { email, password } = req.body;
		console.log("Login attempt:", email);

		const user = await User.findOne({ email });
		if (!user) {
			console.warn("Login failed: No account found for", email);
			return res.status(401).json({
				message: "Invalid email or password",
			});
		}

		const isPasswordCorrect = await compare(password, user.password);
		if (!isPasswordCorrect) {
			console.warn("Login failed: Incorrect password for", email);
			return res.status(401).json({
				message: "Invalid email or password",
			});
		}

		// Clear existing cookie if any
		res.clearCookie(COOKIE_NAME, {
			path: "/",
			httpOnly: true,
			signed: true,
		});

		// Generate token
		const token = createToken(user._id.toString(), user.email, "7d");
		const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); 

		// Set cookie
		res.cookie(COOKIE_NAME, token, {
			path: "/",
			expires,
			httpOnly: true,
			signed: true,
			secure: false, 
			sameSite: "lax",
		});

		console.log("Login successful. Cookie set.");
		return res.status(200).json({
			message: "Login successful",
			name: user.name,
			email: user.email,
		});
	} catch (error) {
		console.error("Login error:", error.message);
		return res.status(500).json({
			message: "Internal Server Error",
			error: error.message,
		});
	}
};


const verifyUserStatus = async (req, res, next) => {
	try {
		const user = await User.findById(res.locals.jwtData.id);
		if (!user)
			return res.status(401).json({
				message: "ERROR",
				cause: "User doesn't exist or token malfunctioned",
			});

		if (user._id.toString() !== res.locals.jwtData.id) {
			return res.status(401).json({
				message: "ERROR",
				cause: "Permissions didn't match",
			});
		}

		return res.status(200).json({ message: "OK", name: user.name, email: user.email });
	} catch (err) {
		console.error(err);
		return res.status(500).json({ message: "ERROR", cause: err.message });
	}
};

const logoutUser = async (req, res, next) => {
	try {
		const user = await User.findById(res.locals.jwtData.id);
		if (!user)
			return res.status(401).json({
				message: "ERROR",
				cause: "User doesn't exist or token malfunctioned",
			});

		if (user._id.toString() !== res.locals.jwtData.id) {
			return res.status(401).json({
				message: "ERROR",
				cause: "Permissions didn't match",
			});
		}

		res.clearCookie(COOKIE_NAME, {
			path: "/",
			httpOnly: true,
			signed: true,
		});

		return res.status(200).json({ message: "OK", name: user.name, email: user.email });
	} catch (err) {
		console.error(err);
		return res.status(500).json({ message: "ERROR", cause: err.message });
	}
};

module.exports = {
	getAllUsers,
	userSignUp,
	userLogin,
	verifyUserStatus,
	logoutUser,
};
