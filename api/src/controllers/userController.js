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
  },

  getUser: async (req, res, next) => {
    const { userId } = req.params;

    if (!ObjectID.isValid(userId)) throw new Error({ flag: 'User Id is not valid', error: 'INVALID_ID' });

    try {
      const user = User.findById(userId);

      if (!user) throw new Error({ flag: 'User is null', error: 'NULL_USER' });
    
      return res.status(200).json(user);
    } catch (error) {

      return res.status(404).json(error);
    }
  },

  // PUT: User Victories/Ties/Defeats
  /**
   * Structure:
   * {
   *  victories: <input>,
   *  ties: <input>,
   *  defeats: <input>
   * }
   */

  // GET: Ranking 
  
};