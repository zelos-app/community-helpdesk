const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const validate = require('./middleware/Validate');
const { Config } = require('./models/Config');
const Ticket = require('./models/Ticket');
const Category = require('./models/Category');
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

// Initialize configurations
async function configure() {
  try {
    const config = new Config();
    config.init();
  } catch (err) {
    console.error(err.stack);
  }
}

async function init() {
  try {
    await configure();
    const zelos = new Zelos();
    await zelos.init();
  } catch (err) {
    console.log(err);
  }
}

init();

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
const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log('[i] Express listening on port', port);
});

// Routes

app.get('/', (req, res) => {
  res.send("Yes hello");
});

app.get('/error', (req, res) => {
  console.log(req.path);
  res.status(404).send("Not found");
});

app.get('/debug/:id', (req, res) => {
  res.status(200).send({
    body: req.body,
    params: req.params,
    query: req.query,
    path: req.path
  });
});

// Tickets
app.route('/api/tickets')
  .get(async (req, res) => {
    const ticket = new Ticket();
    try {
      console.log(`[d] GET request with query ${JSON.stringify(req.query)}`);
      const filter = validate.query(req);
      const result = await ticket.list(filter);
      res.json({
        status: "ok",
        count: result.count,
        tickets: result.tickets,
        settings: result.settings
      });
    } catch (err) {
      handleError(err, res);
    }
  })
  .post(async (req, res) => {
    const ticket = new Ticket();
    try {
      const fields = validate.body(req);
      const id = await ticket.add(fields);
      res.status(201).send(id);
    } catch (err) {
      handleError(err, res);
    }
  })

app.route('/api/tickets/:id')
  .get(async (req, res) => {
    try {
      const id = validate.params(req);
      const ticket = new Ticket(id);
      result = await ticket.get();
      res.send(result);
    } catch (err) {
      handleError(err, res);
    }
  })
  .put(async (req, res) => {
    try {
      const id = validate.params(req);
      const fields = validate.body(req)
      const ticket = new Ticket(id);
      result = await ticket.update(fields);
      res.send(result);
    } catch (err) {
      handleError(err, res);
    }

  })
  .delete(async (req, res) => {
    try {
      const id = validate.params(req);
      const ticket = new Ticket();
      const result = await ticket.delete(id);
      res.send(result);
    } catch (err) {
      handleError(err, res);
    }
  })

////////////////
// Categories //
////////////////

app.route(`/api/areas`)
  .post(async (req, res) => {
    try {
      // todo: validation
      const category = new Category();
      const id = await category.add(req.body);
      res.status(201).send(id);
    } catch (err) {
      handleError(err, res);
    }
  })
  .get(async (req, res) => {
    try {
      const category = new Category();
      const list = await category.list();
      res.send(list);
    } catch (err) {
      handleError(err, res);
    }
  })

app.route('/api/areas/:id')
  .get(async (req, res) => {
    try {
      // todo: validation
      const category = new Category(req.params.id);
      result = await category.get();
      res.send(result);
    } catch (err) {
      handleError(err, res);
    }
  })
  .put(async (req, res) => {
    try {
      // todo: validation
      const category = new Category(req.params.id);
      result = await category.update(req.body);
      res.send(result);
    } catch (err) {
      handleError(err, res);
    }
  })
  .delete(async (req, res) => {
    try {
      // todo: validation
      const category = new Category(req.params.id);
      const result = await category.delete();
      res.send(result);
    } catch (err) {
      handleError(err, res);
    }
  })

///////////
// Areas //
///////////

app.route(`/api/areas`)
  .post(async (req, res) => {
    try {
      // todo: validation
      const area = new Area();
      const id = await area.add(req.body);
      res.status(201).send(id);
    } catch (err) {
      handleError(err, res);
    }
  })
  .get(async (req, res) => {
    try {
      const area = new Area();
      const list = await area.list();
      res.send(list);
    } catch (err) {
      handleError(err, res);
    }
  })

app.route('/api/areas/:id')
  .get(async (req, res) => {
    try {
      // todo: validation
      const area = new Area(req.params.id);
      result = await area.get();
      res.send(result);
    } catch (err) {
      handleError(err, res);
    }
  })
  .put(async (req, res) => {
    try {
      // todo: validation
      const area = new Area(req.params.id);
      result = await area.update(req.body);
      res.send(result);
    } catch (err) {
      handleError(err, res);
    }
  })
  .delete(async (req, res) => {
    try {
      // todo: validation
      const area = new Area(req.params.id);
      const result = await area.delete();
      res.send(result);
    } catch (err) {
      handleError(err, res);
    }
  })

// helper functions

function handleError(err, res) {
  if (err.statusCode) {
    return res.status(err.statusCode).send(err.message);
  } else {
    console.error(err.stack);
    return res.status(500).send("Internal server error");
  }
}