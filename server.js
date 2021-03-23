import express from 'express' //const express = require('express') in CommonJs

const app = express();

//middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get('/:id', (req, res) => {
  console.log(req.params)
  console.log(req.query)
  console.log(req.headers)
  console.log(req.body)
  res.send('okay')
})

app.listen(3000);