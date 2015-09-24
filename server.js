// about login session http://stackoverflow.com/questions/7990890/how-to-implement-login-auth-in-node-js
// http://blog.modulus.io/nodejs-and-express-sessions
"use strict"
let express = require('express')
let app = express()
let http = require('http').Server(app)
let session = require('express-session')
let bodyParser = require('body-parser')

let io = require('socket.io')(http)


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
    res.json({success: true, userId: req.session.userId})
  } else {
    res.send('null')
  }
})

app.post('/signin', function(req, res) {
  console.log(req.session.userId)
  let post = req.body,
      email = post.email,
      password = post.password

  if (password) password = encrypt(password)

  db_User.find({email, password}, function(error, users) {
    if (error || !users || users.length === 0) {
      console.log('signin error')
      res.send('null')
    } else {
      console.log('signin successfully')
      req.session.userId = users[0].userId
      res.json({success: true, userId: users[0].userId})
    }
  })
})

app.post('/signup', function(req, res) {
  let post = req.body,
      email = post.email,
      password = post.password,
      userId = post.userId

  if (password) password = encrypt(password)

  let newUser = db_User({
    email,
    password,
    userId
  })

  newUser.save(function(error) {
    if (error) {
      console.log('signup error', error)
      res.send('null')
    } else {
      console.log('signup successfully')
      req.session.userId = userId
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

// send user profile data
app.post('/get_profile', function(req, res) {
  let post = req.body,
      userId = post.userId
  db_User.find({userId}, function(error, users) {
    if (error || !users || !users.length) {
      res.send('null')
    } else {
      res.json({success: true, data: users[0]})
    }
  })
})

// update user profile intro
app.post('/update_profile_intro', function(req, res) {
  console.log('update profile intro', req.body)
  let post = req.body,
      userId = post.userId,
      intro = post.intro
  console.log('update profile intro', post)
  db_User.findOne({userId}, function(err, doc) {
    if (err || !doc) {
      res.send('null')
    } else {
      doc.intro = intro
      doc.save()
      res.json({success: true})
    }
  })
})

// socket.io
let socketMap = {} // key is userId, value is socket
io.on('connection', function(socket) {
  socket.on('user-connect', function(userId) {
    console.log('user ' + userId + ' logged in')
    socketMap[userId] = socket
    socket.userId = userId
  })

  socket.on('private-message', function(ats, message) {
    console.log('private message: ', ats, message)
    ats.forEach((userId)=> {
      if (socketMap[userId]) { // this userId user is online
        socketMap[userId].emit('receive-message', {message, fromId: socket.userId})
      } else {
        // TODO: send message to offline people
      }
    })
  })

  socket.on("disconnect", function(){
    delete(socketMap[socket.userId])
  })
})

http.listen(31000, function(){
  console.log('listening on *:31000')
})
