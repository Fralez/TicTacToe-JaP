const { Schema, model } = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

const userSchema = new Schema({
  
  name: { // *
    type: String,
    required: [true, 'No name?'],
    uniqueValidator: true
  },

  password: { // *
    type: String,
    required: [true, 'No password?']
  },

  ranking: Number,
  
  victories: {
    type: Number,
    min: 0,
    default: 0
  },
  
  ties: {
    type: Number,
    min: 0,
    default: 0
  },
  
  defeats: {
    type: Number,
    min: 0,
    default: 0
  }
});

// Apply the uniqueValidator plugin to userSchema
userSchema.plugin(uniqueValidator);

const User = model('User', userSchema);

module.exports = {
  User
};