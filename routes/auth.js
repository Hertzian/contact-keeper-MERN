const express = require('express');
const router = express.Router();

// @desc        Get logged in user
// @route       GET api/auth
// @access      Private
router.get('/', (req, res, next) => {
    res.send('Get logged in user');
});

// @desc        Auth user & get token
// @route       POST api/auth
// @access      Public
router.post('/', (req, res, next) => {
    res.send('Log in user');
});

module.exports = router;