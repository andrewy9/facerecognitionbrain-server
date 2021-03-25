import express from 'express' //const express = require('express') in CommonJs
import bcrypt from 'bcrypt-nodejs'
import cors from 'cors'

const app = express();

//middleware
app.use(express.json()) //bodyparser.json()
app.use(cors())

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
  res.json(database.users)
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
  const { email, name, password } = req.body;
  database.users.push({
    id: '125',
    name,
    password,
    email,
    entries: 0,
    joined: new Date()
  });
  res.json(database.users[database.users.length - 1])
})


app.get('/profile/:id', (req, res) => {
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