import express from 'express' //const express = require('express') in CommonJs
import bcrypt from 'bcrypt-nodejs'
import cors from 'cors'
import knex from 'knex'
import { handleRegister } from './controllers/register.js'
import { handleSignin } from './controllers/signin.js'
import { handleProfile } from './controllers/profile.js'
import { handleImage, handleApiCall } from './controllers/image.js'

const db = knex({
  client: 'pg',
  connection: {
    connectionString: process.env.DATABASE_URL,
    ssl: true,
  }
});

const app = express();

//middleware
app.use(cors())
app.use(express.json()) //bodyparser.json()

app.get('/', (req, res) => { res.send('it is working!') })
app.post('/signin', (req, res) => { handleSignin(req, res, db, bcrypt) })
app.post('/register', (req, res) => { handleRegister(req, res, db, bcrypt) })
app.get('/profile/:id', (req, res) => { handleProfile(req, res, db) })
app.put('/image', (req, res) => { handleImage(req, res, db) })
app.post('/imageUrl', (req, res) => { handleApiCall(req, res) })

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`app is running on port ${PORT}`);
});