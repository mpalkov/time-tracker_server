const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User.model");

const router = express.Router();
const saltRounds = 15;

const respondErrMessage = (response, statusNo, messageText) => {
	response.status(statusNo).json({ message: messageText });
};

// POST		/auth/signup
router.post("/signup", (req, res, next) => {
	// get varaiables from request body
	const { email, name, password } = req.body;

	// check if no empty e-mail or password fields
	if (email === '' || password === '') {
		respondErrMessage(res, 400, "e-mail and password are required.");
		return;
	}

	//set Regex rule and check the e-mail with this rule
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
	if (!emailRegex.test(email)) {
		respondErrMessage(res, 400, "Provide a valid e-mail address!");
		return;
	}

	//set Regex rule and check the password with this rule
	const passwordRegex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
	if (!passwordRegex.test(password)) {
		respondErrMessage(res, 400, "Password must have at least 6 characters, contain at least one number, one lowercase and one uppercase letter.");
		return;
	}

	// check if user with the e-mail already exists in our DB
	User.findOne({email})
		.then((foundUser) => {
			if (foundUser) {
				respondErrMessage(res, 400, "User with this e-mail already exists");
				return;
			}

			// If the email is unique, proceed to hash the passowrd
			const hashedPassword = bcrypt.hashSync(password, saltRounds);

			// and create new user in the DB
			return User.create({ email, password: hashedPassword, name });
		})
		.then((createdUser) => {
			const {email, name, _id} = createdUser;
			const user = {email, name, _id};
			res.status(200).json({user});
		})
		.catch((err) => {
			respondErrMessage(res, 500, `Server error: ${err}`);
		});
})

// https://my.ironhack.com/cohorts/6308c7cea5eeff002c60c2d7/lms/courses/course-v1:IRONHACK+WDFT+202310_BCN/modules/ironhack-course-chapter_9/units/ironhack-course-chapter_9-sequential_1-vertical_2#Sign-Up-Route
// POST		/auth/login
router.post("/login", (req, res, next) => {
	const { email, password } = req.body;

	// Check if email or password are provided as empty string
	if (email === "" || password === "") {
		res.status(400).json({ message : "Provide e-mail and password!" });
		return;
	}

	// Check the users collection if a user with the same email exists
	User.findOne({"email": {$eq: email}})
		.then(foundUser => {
			if (!foundUser) {
				respondErrMessage(res, 400, "e-mail address not found.");
				return;
			}
		})


})

// GET		/auth/verify


module.exports = router;