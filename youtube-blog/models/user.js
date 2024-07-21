const { Schema } = require('mongoose');
const { type } = require('os');

const userSchema = new Schema({

    fullName:{
        type: String,
        required:true
    },
    email:{
        type: String,
        required:true, 
        unique: true
    },
    salt:{
        type: String,
        required:true
    },
    password:{
        type: String,
        required:true,
    },
    progileImageUrl:{
    type: String,
    }
} {timestamps: true})