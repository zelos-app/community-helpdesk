const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const routes = require('./routes');
const rateLimit = require("express-rate-limit");
const getDuration = require('./middleware/Timer');
const Config = require('./models/Config');

// Check environment
if (process.env.NODE_ENV !== "production") {
  require('dotenv').config();
}

// Connect to DB
mongoose.connect(process.env.DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  auth: {
    authSource: "admin",
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD
  }
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log(`[i] Database connection successful`);
});

// Initialize
async function init() {
  try {
    const config = new Config();
    const settings = await config.get();
  } catch (err) {
    console.error(err.stack);
  }
}

// Rate limiting
const resetLimit = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 3
});

// Set up Express middlewares
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());
app.use("/auth/reset", resetLimit);
app.use((err, req, res, next) => {
  if (err) {
    res.status(400).send('Bad request')
  } else {
    next()
  }
})

// Enable response time logging
if (process.env.LOG_RESPONSE_TIME) {
  app.use((req, res, next) => {
    const start = process.hrtime()
    res.on('finish', () => {
      const duration = getDuration(start)
      console.log(`[d] ${req.method} ${req.originalUrl} [FINISHED] ${duration .toLocaleString()} ms`)
    })
    res.on('close', () => {
      const duration = getDuration(start)
      console.log(`[d] ${req.method} ${req.originalUrl} [CLOSED] ${duration .toLocaleString()} ms`)
    })
    next()
  })
}

app.use('/', routes);

const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log('[i] Express listening on port', port);
});

init();