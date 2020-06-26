const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const {check, validationResult} = require('express-validator');

const User = require('../models/User');
const Contact = require('../models/Contact');

// @desc        Get all users contacts
// @route       GET api/contacts
// @access      Private
router.get('/', auth, async (req, res, next) => {
    try {
        // -1 is to bring the most recent by date
        const contacts = await Contact.find({user: res.user.id}).sort({date: -1});

        res.json({success: true, contacts});
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @desc        Add new contact
// @route       POST api/contacts
// @access      Private
router.post('/', (req, res, next) => {
    res.send('Add contact');
});

// @desc        Update contact
// @route       PUT api/contacts/:id
// @access      Private
router.put('/:id', (req, res, next) => {
    res.send('Update contact');
});

// @desc        Delete contact
// @route       DELETE api/contacts/:id
// @access      Private
router.delete('/:id', (req, res, next) => {
    res.send('Delete contact');
});

module.exports = router;