// about login session http://stackoverflow.com/questions/7990890/how-to-implement-login-auth-in-node-js
// http://blog.modulus.io/nodejs-and-express-sessions
"use strict"
let express = require('express')
let app = express()
let http = require('http').Server(app)
let session = require('express-session')
let bodyParser = require('body-parser')


/**
 * Encrypt string
 */
let crypto = require('crypto'),
    algorithm = 'aes-256-ctr'
function encrypt(text){
  var cipher = crypto.createCipher(algorithm, "asdfnjksaQW");
  var crypted = cipher.update(text,'utf8','hex');
  crypted += cipher.final('hex');
  return crypted;
}


/**
 * Database Schema
 */
let db_User = require("./schema/user.js") // require database User model.


app.use(session({
  secret: '1234567890QWERTY',
}))

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
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
    res.json({success: true})
  } else {
    res.send('null')
  }
})

app.post('/signin', function(req, res) {
  console.log(req.session.userId)
  let post = req.body,
      email = post.email,
      password = post.password
  db_User.find({email, password}, function(error, users) {
    if (error || !users || users.length === 0) {
      console.log('signin error')
      res.send('null')
    } else {
      console.log('signin successfully')
      req.session.userId = '@id:' + post.email
      res.json({success: true})
    }
  })
})

app.post('/signup', function(req, res) {
  let post = req.body,
      email = post.email,
      password = post.password

  let newUser = db_User({
    email,
    password
  })

  newUser.save(function(error) {
    if (error) {
      console.log('signup error', error)
      res.send('null')
    } else {
      console.log('signup successfully')
      req.session.userId = '@id:' + post.email
      res.json({success: true})
    }
  })

})

app.get('/logout', function(req, res) {
  delete(req.session.userId)
  res.send({success: true})
})

app.get('/images/:image_name', function(req, res) {
  res.sendFile(__dirname + '/images/' + req.params.image_name)
})

http.listen(31000, function(){
  console.log('listening on *:31000')
})
