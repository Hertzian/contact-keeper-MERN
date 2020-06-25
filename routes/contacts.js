const express = require('express');
const router = express.Router();

// @desc        Get all users contacts
// @route       GET api/contacts
// @access      Private
router.get('/', (req, res, next) => {
    res.send('Get all contacts');
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