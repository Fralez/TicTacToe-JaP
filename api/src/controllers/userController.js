const { ObjectID } = require('mongodb');

// Models
const { User } = require('../models/user');

module.exports = {

  // Get users index
  index: async (req, res, next) => {
    const users = await User.find({});

    return res.status(200).json(users);
  },
  
  // Post a user
  postUser: async (req, res, next) => {
    const user = new User(req.body);
    
    try {
      await user.save();
    } catch (error) {

      return res.status(400).json({ flag: 'Error at saving' });
    }

    return res.status(201).json(user);
  },

  // Get a user
  getUser: async (req, res, next) => {
    try {
      const { userId } = req.params;
      if (!ObjectID.isValid(userId)) throw new Error('INVALID_ID');
      
      const user = await User.findById(userId);

      if (!user) throw new Error('NULL_USER');
    
      return res.status(200).json(user);
    } catch (error) {

      return res.status(404).json(error.message);
    }
  },

  // Update user's personal info
  putUserInfo: async (req, res, next) => {    
    try {
      const { userId } = req.params;
      if (!ObjectID.isValid(userId)) throw new Error('INVALID_ID');
      
      const user = await User.findByIdAndUpdate(userId, req.body, { new: true });

      return res.status(201).json(user);
    } catch (error) {
      
      return res.status(404).json(error.message);
    }

  },
  
  // Get Ranking
  getRanking: async (req, res, next) => {
    let users = await User.find({}, 'name victories');

    if (users.length > 1) {
      users.sort((a, b) => {
        return b.victories - a.victories;
      });
    }

    res.status(200).json(users);
  },

  // Get user's played matches
  getUserMatches: async (req, res, next) => {
    const { userId } = req.params;
    if(!ObjectID.isValid(userId)) return res.status(404).json({ error: 'INVALID_ID' });

    const { matches } = await User.findById(userId).populate('matches');

    return res.status(200).json(matches);
  }

};