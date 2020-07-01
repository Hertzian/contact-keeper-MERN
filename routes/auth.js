const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const auth = require('../middleware/auth');
const {check, validationResult} = require('express-validator');

const User = require('../models/User');

// @desc        Get logged in user
// @route       GET api/auth
// @access      Private
router.get('/', auth, async (req, res, next) => {
    try {
        // if send correct token req object have a logged in user.id
        const user = await User.findById(req.user.id).select('-password');

        res.status(200).json({success: true, user});
        
    } catch (err) {
        
        res.status(500).send('Server Error');
    }
});

// @desc        Auth user & get token
// @route       POST api/auth
// @access      Public
router.post(
    '/',
    [
        check('email', 'Please add a valid email').isEmail(),
        check('password', 'Password is required').exists()
    ],
    async (req, res, next) => {
        const errors = validationResult(req);

        // added success field...
        if(!errors.isEmpty()){
            return res.status(400).json({success: false, errors: errors.array()});
        }

        const {email, password} = req.body;

        try {
            let user = await User.findOne({email});

            // if user desn´t exists
            if(!user){
                return res.status(400).json({success: false, msg: 'Invalid credentials'});
            }
            
            const isMatch = await bcrypt.compare(password, user.password);
            
            // if password doesn´t match
            if(!isMatch){
                return res.status(400).json({success: false, msg: 'Invalid credentials'});
            }

            // payload for jwt
            const payload = {
                user: {
                    id: user.id
                }
            }

            // Make token & response
            jwt.sign(
                payload,
                config.get('jwtSecret'),
                {
                    expiresIn: 360000
                },
                (err, token) => {
                    if(err) {
                        throw err;
                    }

                    // added success field...
                    res.json({success: true, token});
                }
            );
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    }
);

module.exports = router;
