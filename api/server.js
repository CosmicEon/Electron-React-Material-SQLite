const express = require('express');
const bodyParser = require('body-parser');
const db = require('./db.js');

const app = express();
// var PORT = process.env.PORT || 3010;
const PORT = 3200;
const todos = [];
const todoNextId = 1;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Access-Control-*, Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.get('/', (req, res) => {
  res.send('ToDo API Root');
});

// GET requests /todos?completed=true
app.get('/todos', (req, res) => {
  const query = req.query;
  const where = {};

  if (query.hasOwnProperty('completed') && query.completed === 'true') {
    where.completed = true;
  } else if (query.hasOwnProperty('completed') && query.completed === 'false') {
    where.completed = false;
  }

  if (query.hasOwnProperty('q') && query.q.length > 0) {
    where.description = {
      $like: `%${query.q}%`,
    };
  }
  db.todo.findAll({ where })
    .then((todos) => {
      res.json(todos);
    }, (e) => {
      res.status(500).send();
    });
});

app.get('/todos/:id', (req, res) => {
  const todoId = parseInt(req.params.id, 10);

  db.todo.findById(todoId).then((todo) => {
    if (todo) {
      res.json(todo.toJSON());
    } else {
      res.status(404).send();
    }
  }, (e) => {
    res.status(500).send();
  });
});

// POST /todos
app.post('/todos', (req, res) => {
  const body = {
    description: req.body.description,
    completed: req.body.completed,
  };

  db.todo.create(body)
    .then((todo) => {
      req.user.addTodo(todo)
        .then(() => {
          return todo.reload();
        })
        .then((todo) => {
          res.json(todo.toJSON());
        });
    }, (e) => {
      res.status(400).json(e);
    });
});

// DELETE Requests
app.delete('/todos/:id', (req, res) => {
  const todoId = parseInt(req.params.id, 10);

  db.todo.destroy({
    where: {
      id: todoId,
    },
  }).then((rowsDeleted) => {
    if (rowsDeleted === 0) {
      res.status(400).json({
        error: 'No todo with id',
      });
    } else {
      res.status(204).send();
    }
  }, () => {
    res.status(500).send();
  });
});

// PUT /todos/:id
app.put('/todos/:id', (req, res) => {
  const todoId = parseInt(req.params.id, 10);
  const body = {
    description: req.body.description,
    completed: req.body.completed,
  };
  const attributes = {};

  if (body.hasOwnProperty('completed')) {
    attributes.completed = body.completed;
  }
  if (body.hasOwnProperty('description')) {
    attributes.description = body.description;
  }

  db.todo.findById(todoId).then((todo) => {
    if (todo) {
      todo.update(attributes).then((todo) => {
        res.json(todo.toJSON());
      }, (e) => {
        res.status(400).json(e);
      });
    } else {
      res.status(404).send();
    }
  }, () => {
    res.status(500).send();
  });
});

app.post('/users', (req, res) => {
  const body = {
    email: req.body.email,
    password: req.body.passowrd,
  };

  db.user.create(body).then((user) => {
    res.json(user.toPublicJSON());
  }, (e) => {
    res.status(400).json(e);
  });
});

// POST /users/login
app.post('/users/login', (req, res) => {
  const body = {
    email: req.body.email,
    password: req.body.passowrd,
  };

  db.user.authenticate(body).then((user) => {
    let token = user.generateToken('authentication');

    if (token) {
      res.header('Auth', token).json(user.toPublicJSON());
    } else {
      res.status(401).send();
    }
  }, () => {
    res.status(401).send();
  });
});


db.sequelize.sync({ force: true }).then(() => {
  app.listen(PORT, () => {
    console.log(`Express listening on port ${PORT} !!`);
  });
});
