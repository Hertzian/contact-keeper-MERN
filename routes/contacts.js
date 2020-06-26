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
        const contacts = await Contact.find({user: req.user.id}).sort({date: -1});

        res.status(200).json({success: true, contacts});
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @desc        Add new contact
// @route       POST api/contacts
// @access      Private
router.post(
    '/',
    [
        auth,
        [check('name', 'Name is required').not().isEmpty()]
    ],
    async (req, res, next) => {
        const errors = validationResult(req);

        // added success field...
        if(!errors.isEmpty()){
            return res.status(400).json({success: false, errors: errors.array()});
        }

        const {name, email, phone, type} = req.body;

        try {
            // instanciate Contact model and passed values
            const newContact = new Contact({
                name,
                email,
                phone,
                type,
                user: req.user.id
            });

            // save contact to db
            const contact = await newContact.save();

            res.status(201).json({success: true, contact});
        } catch (err) {
            console.error(err.message)
            res.status(500).json('Server Error');
        }
    }
);

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