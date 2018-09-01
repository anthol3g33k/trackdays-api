var express = require('express')
var router = express.Router()
var config = require('config')
var Event = require('../models/EventModel')

/* GET users list. */
router.get('/', function(req, res, next) {
  Event.find().exec(function(err, events) {
    if (err) return res.status(500).send({'error': err})
    else return res.send(events)
  })
})

/* GET user by id. */
router.get('/:id', function(req, res, next) {
  var id = req.params.id
  Event.findOne({_id: id}).exec(function(err, event) {
    if (err) return res.status(500).send({'error': err})
    else if (event === null) return res.status(404).send({'error': 'event not found for id=' + id})
    else return res.send(event)
  })
})

/* POST user. */
router.post('/', function(req, res, next) {
  let event = new Event(req.body)
  event.validate(function(err) { console.log(err) })
  event.save()
    .then(eventSaved => { return res.send(eventSaved) })
    .catch(err => { return res.status(500).send({'error': err}) })
})

/* PUT user by id */
router.put('/:id', function(req, res, next) {
  var id = req.params.id
  let event = new Event(req.body)
  Event.findOneAndUpdate({_id: id}, event, { new: true }).exec(function(err, event) {
    if (err) return res.status(500).send({'error': err.errmsg})
    else if (event == null) return res.status(404).send({'error': 'event not found for id=' + id})
    else return res.send(event)
  })
})

module.exports = router
