var createError = require('http-errors')
var express = require('express')
var path = require('path')
var cookieParser = require('cookie-parser')
var logger = require('morgan')
var cors = require('cors')
var indexRouter = require('./routes/AppController')
var usersRouter = require('./routes/UserController')
var partnersRouter = require('./routes/PartnerController')
var eventsRouter = require('./routes/EventController')
var authRouter = require('./routes/AuthController')
var db = require('./db');

var app = express()

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))
app.use(cors())

app.use('/', indexRouter)
app.use('/users', usersRouter)
app.use('/partners', partnersRouter)
app.use('/events', eventsRouter)
app.use('/api/auth', authRouter)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404))
})



module.exports = app
