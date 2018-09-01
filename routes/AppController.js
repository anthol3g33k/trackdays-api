var express = require('express')
var router = express.Router()

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log("Hello World")
  res.send({'ok': true})
})

module.exports = router
