"use strict"
let mongoose = require('mongoose'),
    Schema = mongoose.Schema

mongoose.connect('mongodb://127.0.0.1/One')

/**
 * Check database connection
 **/
let db = mongoose.connection
db.on("error", function(){
  console.log("Failed to connect to database: users");
})

db.once("open", function(callback){
  console.log("Connected to database: users");
})

// create schema
var userSchema = new Schema({
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
/*
    intro: {type: String, default: ""},
    gender: {type: String, default: "Female"},
    location: {type: String, default: ""},
    birthday: {type: Date, default: "03/30/1994"},
    profile_wall_image: {type: String, default:"default_profile_wall.jpg"},
    profile_image: {type: String, default: ""},
    follow: {type:Array, default: []}
    */
})

// create model that uses the schema
let db_User = mongoose.model("User", userSchema);

// make this available to our users.
module.exports = db_User
