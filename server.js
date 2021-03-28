import express from 'express' //const express = require('express') in CommonJs
import bcrypt from 'bcrypt-nodejs'
import cors from 'cors'
import knex from 'knex'
import _ from './env.js'
import { handleRegister } from './controllers/register.js'
import { handleSignin } from './controllers/signin.js'
import { handleProfile } from './controllers/profile.js'
import { handleImage, handleApiCall } from './controllers/image.js'

const db = knex({
  client: 'pg',
  connection: {
    host: '127.0.0.1',
    user: `${process.env.DB_USER}`,
    password: `${process.env.DB_PSWD}`,
    database: 'smart-brain'
  }
});

const app = express();

//middleware
app.use(cors())
app.use(express.json()) //bodyparser.json()

app.post('/signin', (req, res) => { handleSignin(req, res, db, bcrypt) })
app.post('/register', (req, res) => { handleRegister(req, res, db, bcrypt) })
app.get('/profile/:id', (req, res) => { handleProfile(req, res, db) })
app.put('/image', (req, res) => { handleImage(req, res, db) })
app.post('/imageUrl', (req, res) => { handleApiCall(req, res) })

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`app is running on port ${PORT}`);
});