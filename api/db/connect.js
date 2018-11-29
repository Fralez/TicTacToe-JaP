const mongoose = require('mongoose');

(async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/ticTacToe', { useNewUrlParser: true })
    console.log('DB connection: successful');
  } catch (error) {
    console.log('Connection error: ', error);    
  }
})()

module.exports = {
  mongoose
}