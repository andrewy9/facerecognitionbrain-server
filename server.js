import express from 'express' //const express = require('express') in CommonJs

const app = express();

//middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get('/', (req, res) => {
  res.send("getting root")
})

app.get('/profile', (req, res) => {
  res.send("getting profile")
})

app.post('/profile', (req, res) => {
  console.log(req.body)
  return res.send('success')
})

app.listen(3000);