const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');//for add and remove companies only if you are authenticated

//Item Model for doing query
const Company = require('../../models/Company');

//@route   Get api/items
//@desc    Get All Items
//@access  Public
router.get('/', (req, res) => {
    Company.find() //fetch all of the companies on the database
        .then(companies => res.json(companies));
});

//@route   Post api/items
//@desc    Create A Post
//@access  Private
router.post('/', auth, (req, res) => {
    const newCompany = new Company({//the data are in the body of the request
        name: req.body.name,
        description: req.body.description,
        website: req.body.website,
        address: req.body.address,
        lat: req.body.lat,
        lng: req.body.lng
    });
    newCompany.save()
        .then(company => res.json(company));
});

//@route   Delete api/items
//@desc    Delete A Company
//@access  Private
router.delete('/:id', auth, (req, res) => {
    Company.findById(req.params.id)
        .then(company => company.remove().then(() => res.json({success: true})))
        .catch(err => res.status(404).json({success: false}));//if we pass an id that doesen't exists shoud get a promiss reject
});


module.exports = router;