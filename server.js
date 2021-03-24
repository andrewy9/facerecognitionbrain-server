import express from 'express' //const express = require('express') in CommonJs
import { dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
console.log(__dirname)

const app = express();


//middleware
// console.log(__dirname)
app.use(express.static(__dirname + '/public'))

app.listen(3000);