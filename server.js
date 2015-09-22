// about login session http://stackoverflow.com/questions/7990890/how-to-implement-login-auth-in-node-js
// http://blog.modulus.io/nodejs-and-express-sessions
"use strict"
let express = require('express')
let app = express()
let http = require('http').Server(app)
let session = require('express-session')

let hour = 3600000
app.use(session({
  secret: '1234567890QWERTY',
}))

function checkAuth(req, res, next) {
  // req.session.user_id = "this is my userid"
  if (!req.session.userId) {
    res.send('You are not authorized to view this page')
  } else {
    next()
  }
}

app.use(express.static(__dirname + '/www'));

app.get('/', function(req, res){
  res.sendFile(__dirname + '/www/index.html')
})

// src has problem
// I solve it temporarily in this way
/*
app.get('/build/:filename', function(req, res) {
  res.sendFile(__dirname + '/www/build/bundle.js')
})
*/

app.get('/auth', function(req, res) {
  if (req.session.userId) {
    res.send(userId)
  } else {
    res.send('null')
  }
})

app.post('/login', function(req, res) {
  let post = req.body
  if (!post.session.userId) {
    if (post.email === 'shd101wyy' && post.password === '123') {
      req.session.userId = '@id:' + post.email
      req.send('login-success')
    } else {
      res.send('login-error')
    }
  } else {
    // session saved already
    res.send('login-success')
  }
})

app.get('/logout', function(req, res) {
  delete(req.session.userId)
  res.send('logout-succss')
})

http.listen(31000, function(){
  console.log('listening on *:31000')
})
