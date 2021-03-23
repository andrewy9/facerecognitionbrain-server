import express from 'express' //const express = require('express') in CommonJs

const app = express();

app.use((req, res, next) => {
  console.log(`<h1>hello<h1>`)
  next()
})

app.get('/', (req, res) => {
  // res.send('hello')
  // res.send('<h1>hello</h1>')
  const user = {
    name: 'Joe',
    hobby: 'Singing'
  }
  res.send(user)
})

app.listen(3000);