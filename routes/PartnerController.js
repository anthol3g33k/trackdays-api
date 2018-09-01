var express = require('express')
var router = express.Router()
var config = require('config')
var Partner = require('../models/PartnerModel')

/* GET partners list. */
router.get('/', function(req, res, next) {
  Partner.find().exec(function(err, partners) {
    if (err) return res.status(500).send({'error': err})
    else return res.send(partners)
  })
})

/* GET partner by id. */
router.get('/:id', function(req, res, next) {
  var id = req.params.id
  Partner.findOne({_id: id}).exec(function(err, partner) {
    if (err) return res.status(500).send({'error': err})
    else if (partner === null) return res.status(404).send({'error': 'partner not found for id=' + id})
    else return res.send(partner)
  })
})

/* POST partner. */
router.post('/', function(req, res, next) {
  let partner = new Partner(req.body)
  partner.validate(function(err) { if (err) console.log(err) })
  partner.save()
    .then(partnerSaved => { return res.send(partnerSaved) })
    .catch(err => { return res.status(500).send({'error': err}) })
})

/* PUT partner by id */
router.put('/:id', function(req, res, next) {
  var id = req.params.id
  let partner = new Partner(req.body)
  Partner.findOneAndUpdate({_id: id}, partner, { new: true }).exec(function(err, partner) {
    if (err) return res.status(500).send({'error': err.errmsg})
    else if (partner == null) return res.status(404).send({'error': 'partner not found for id=' + id})
    else return res.send(partner)
  })
})

module.exports = router
