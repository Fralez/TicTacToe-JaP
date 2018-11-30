const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// Connected to database mongoose
const { mongoose } = require('./db/connect');
mongoose.Promise = global.Promise;

const app = express();

// General middlewares
app.use(cors());
app.use(bodyParser.json());

// Routes middlewares
const userRouter = require('./src/routes/userRoutes').Router;
const matchRouter = require('./src/routes/matchRoutes').Router;

// Routes
app.use('/api/users', userRouter);
app.use('/api/matches', matchRouter);

app.set('port', process.env.PORT || 8081);
const PORT = app.get('port');

app.listen(PORT, () => {
  console.log(`Listening to the port ${PORT}`);
});