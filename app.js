const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const routes = require('./routes');
const { Config } = require('./models/Config');

const Zelos = require('./models/Zelos');

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
    await config.init();
    // const zelos = new Zelos(); // debug
    // await zelos.init(); // debug
  } catch (err) {
    console.error(err.stack);
  }
}

// Setup Express
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());
app.use((err, req, res, next) => {
  if (err) {
    res.status(400).send('Bad request')
  } else {
    next()
  }
})

app.use('/', routes);

const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log('[i] Express listening on port', port);
});

init();