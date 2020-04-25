const express = require('express');
const router = express.Router();

// Item Model
const Item = require('../../model/Item');

// @route  GET api/items
// @desc   Get All Items
// @access Public
router.get('/', (req, res) => { // if weren't using routers should be /api/items
    Item.find()
        .sort({ date: -1 }) //desc
        .then(items => res.json(items));
}); 

// @route  POST api/items
// @desc   Create an Item
// @access Public
router.post('/', (req, res) => {
    const newItem = new Item({
        name: req.body.name   //bodyParser enable it
    });

    newItem.save()
        .then((item) => res.json(item))
        .catch((er) => res.json(er));
});

// @route  PUT api/items/:id
// @desc   Update an Item
// @access Public
router.put('/:id', (req, res) => {
    let id = req.params.id;
                             //{ name: req.body.name } // {new: true} return updated element
    Item.findByIdAndUpdate(id, {$set:req.body}, {new: true}).then(item => res.json(item))
    .catch((er) => res.status(404).json({success:false, parmitem:req.params.id, bodyitem:req.body._id}))
});

// @route  DELETE api/items/:id
// @desc   Delete an Item
// @access Public
router.delete('/:id', (req, res) => {
    
    Item.findById(req.params.id)
        .then((item) => item.remove()
                            .then(() => res.json({success:true,item:req.params.id})))
        .catch((er) => res.status(404).json({success:false,item:req.params.id}))
});

module.exports = router;