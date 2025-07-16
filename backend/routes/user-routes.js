const express = require("express");
const { getAllUsers, userSignUp, userLogin, verifyUserStatus, logoutUser } = require("../controllers/user-controllers.js");
const {	loginValidator, signUpValidator, validate } = require("../utils/validators.js");
const { verifyToken } = require("../utils/token-manager.js");

const userRoutes = express.Router();

userRoutes.get("/", getAllUsers);

userRoutes.post("/signup", validate(signUpValidator), userSignUp);

userRoutes.post("/login", validate(loginValidator), userLogin);

userRoutes.get("/auth-status", verifyToken, verifyUserStatus);

userRoutes.get("/logout", verifyToken, logoutUser);

module.exports = userRoutes;
