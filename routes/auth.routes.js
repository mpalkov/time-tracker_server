const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User.model");

const router = express.Router();
const saltRounds = 15;

// POST		/auth/signup
router.post("/signup", (req, res, next) => {
	const { email, name, password } = req.body;

	if (email === '' || password === '') {
		res.status(400).json({message: "e-mail and password are required."});
		return;
	}

	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
	if (!emailRegex.test(email)) {
		res.status(400).json({message: "Provide a valid e-mail address!"});
		return;
	}

	
})


// POST		/auth/login


// GET		/auth/verify


module.exports = router;