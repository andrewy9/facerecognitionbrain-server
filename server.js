import express from 'express' //const express = require('express') in CommonJs
import bcrypt from 'bcrypt-nodejs'

const app = express();

//middleware
app.use(express.json()) //bodyparser.json()

const database = {
  users: [
    {
      id: '123',
      name: 'John',
      email: 'john@gmail.com',
      entries: 0,
      joined: new Date()
    },
    {
      id: '124',
      name: 'Sally',
      email: 'sally@gmail.com',
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
  bcrypt.compare("apples", '$2a$10$H.hB/pvW9tUo6AegZQYT9ub4w09t4.qdWfHqdV3sUk2Nzk0z2FeM2', function (err, res) {
    console.log('first guess', res)
  });
  if (req.body.email === database.users[0].email &&
    req.body.password === database.users[0].password) {
    res.json('sucess!')
  } else {
    res.json('sign in');
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
      return res.json(user);
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



app.listen(3000, () => {
  console.log('app is running on port 3000');
});