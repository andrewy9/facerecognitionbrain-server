import express from 'express' //const express = require('express') in CommonJs
import bcrypt from 'bcrypt-nodejs'
import cors from 'cors'
import knex from 'knex'
import _ from './env.js'

const db = knex({
  client: 'pg',
  connection: {
    host: '127.0.0.1',
    user: 'postgres',
    password: `${process.env.DB_PSWD}`,
    database: 'smart-brain'
  }
});

const app = express();

//middleware
app.use(cors())
app.use(express.json()) //bodyparser.json()

const database = {
  users: [
    {
      id: '123',
      name: 'John',
      email: 'john@gmail.com',
      password: 'cookies',
      entries: 0,
      joined: new Date()
    },
    {
      id: '124',
      name: 'Sally',
      email: 'sally@gmail.com',
      password: 'bananas',
      entries: 0,
      joined: new Date()
    }
  ],
  login: [{
    id: '987',
    hash: '',
    email: 'john@gmail.com'
  }

  ]
}

app.get('/', (req, res) => {
  console.log('hit')
  res.json(db.user)
})

app.post('/signin', (req, res) => {
  if (req.body.email === database.users[0].email &&
    req.body.password === database.users[0].password) {
    return res.status(200).json(database.users[0])
  } else {
    return res.status(400).json('log in error')
  }
})

app.post('/register', (req, res) => {
  console.log('register hit')
  const { email, name, password } = req.body;
  db('users')
    .returning('*')
    .insert({
      email,
      name,
      joined: new Date()
    }).then(user => {
      console.log(user)
      return res.status(200).json(user[0]);
    })
    .catch(err => res.status(400).json('unable to register'))
})


app.get('/profile/:id', (req, res) => {
  console.log('this is hit')
  const { id } = req.params;
  let found = false;
  database.users.forEach(user => {
    if (user.id === id) {
      found = true;
      return res.json(user);
    }
  })

  if (!found) {
    return res.status(400).json('not found')
  }
})


app.put('/image', (req, res) => {
  const { id } = req.body;
  let found = false;
  database.users.forEach(user => {
    if (user.id === id) {
      found = true;
      user.entries++
      return res.json(user.entries);
    }
  })
  if (!found) {
    return res.status(400).json('not found')
  }
})

// bcrypt.hash("bacon", null, null, function (err, hash) {
//   // Store hash in your password DB.
// });

// // Load hash from your password DB.
// bcrypt.compare("bacon", hash, function(err, res) {
//   // res == true
// });
// bcrypt.compare("veggies", hash, function(err, res) {
//   // res = false
// });

app.listen(3001, () => {
  console.log('app is running on port 3001');
});