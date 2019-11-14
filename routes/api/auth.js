const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');

//User Model
const User = require('../../models/User');

//@route    POST api/auth
//@desc     Authentation
//@access   Public
router.post('/', (req, res) => {
	const { email, password } = req.body;

	//Simple Validation
	if (!email || !password) {
		return res.status(400).json({ msg: 'Please enter all the fields' });
	}

	//Check for existing user
	User.findOne({ email: email }).then(user => {
		if (!user) return res.status(400).json({ msg: 'User do not exists' });

		//Validate Passowrd
		bcrypt.compare(password, user.password).then(isMatch => {
			if (!isMatch) return res.status(400).json({ msg: 'Invalid Credentials' });

			jwt.sign(
				{ id: user.id },
				config.get('jwtSecret'),
				{ expiresIn: 3600 },
				(err, token) => {
					if (err) throw err;
					res.json({
						token,
						user: {
							id: user.id,
							name: user.name,
							email: user.email
						}
					});
				}
			);
		});
	});
});

module.exports = router;