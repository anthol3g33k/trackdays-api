var express = require('express')
var router = express.Router()
var config = require('config')
var User = require('../models/UserModel')

/* GET users list. */
router.get('/', function(req, res, next) {
  User.find().exec(function(err, users) {
    if (err) return res.status(500).send({'error': err})
    else return res.send(users)
  })
})

/* GET user by id. */
router.get('/:id', function(req, res, next) {
  var id = req.params.id
  User.findOne({_id: id}).exec(function(err, user) {
    if (err) return res.status(500).send({'error': err})
    else if (user === null) return res.status(404).send({'error': 'user not found for id=' + id})
    else return res.send(user)
  })
})

/* POST user. */
router.post('/', function(req, res, next) {
  let user = new User(req.body)
  user.validate(function(err) { console.log(err) })
  user.save()
    .then(userSaved => { return res.send(userSaved) })
    .catch(err => { return res.status(500).send({'error': err}) })
})

/* PUT user by id */
router.put('/:id', function(req, res, next) {
  var id = req.params.id
  let user = new User(req.body)
  User.findOneAndUpdate({_id: id}, user, { new: true }).exec(function(err, user) {
    if (err) return es.status(500).send({'error': err.errmsg})
    else if (user == null) return res.status(404).send({'error': 'user not found for id=' + id})
    else return res.send(user)
  })
})

module.exports = router
