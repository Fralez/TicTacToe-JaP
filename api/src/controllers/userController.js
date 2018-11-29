const mongoose = require('mongoose');
const { ObjectID } = require('mongodb');

// Model
const { User } = require('../models/user');

module.exports = {

  index: async (req, res, next) => {
    const users = await User.find({});

    return res.status(200).json(users);
  },

  postUser: async (req, res, next) => {
    const user = new User(req.body);
    
    try {
      await user.save();
    } catch (error) {
      return res.status(400).json({ flag: 'Error at saving', error: error });
    }

    return res.status(201).json(user);
  }
  
};