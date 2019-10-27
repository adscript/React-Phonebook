var express = require('express');
var router = express.Router();
const PhoneBook = require('../models/phonebook')

// get All Phonebook Data
router.get('/', function (req, res) {
    PhoneBook.find().then(pbData => {
        res.json({
            status: 'SUCCESS',
            pbData
        })
    }).catch(err => {
        res.json({
            status: 'FAILED',
            message: err
        })
    })
})

router.post('/', function (req, res) {
    let { name, phoneNumber } = req.body;
    PhoneBook.create({ name, phoneNumber })
        .then(pbItem => {
            res.json({
                status: 'SUCCESS',
                pbData: pbItem
            })
        }).catch(err => {
            res.json({
                status: 'FAILED',
                message: err
            })
        })
})

router.delete('/:id', function (req, res) {
    PhoneBook.findOneAndRemove({ id: Number(req.params.id) })
        .then(item => {
            res.json({
                status: 'SUCCESS',
                pbData: item
            })
        }).catch(err => {
            res.json({
                status: 'FAILED',
                message: err
            })
        })
})

router.put('/:id', function (req, res){
    PhoneBook.findOneAndUpdate({ id: Number(req.params.id) }, { name: req.body.name, phoneNumber: req.body.phoneNumber })
    .then(item => {
        res.json({
            status: 'SUCCESS',
            pbData: item
        })
    }).catch(err => {
        res.json({
            status: 'FAILED',
            message: err
        })
    })
})

router.post('/search', function (req, res){
    let filter = {};
    req.body.name ? filter.name = req.body.name : '';
    req.body.phoneNumber ? filter.phoneNumber = req.body.phoneNumber : '';
    PhoneBook.find(filter)
    .then(item => {
        res.json({
            status: 'SUCCESS',
            pbData: item
        })
    }).catch(err => {
        res.json({
            status: 'FAILED',
            message: err
        })
    })
})


module.exports = router;
