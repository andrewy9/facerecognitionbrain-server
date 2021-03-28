import Clarifai from 'clarifai'
import _ from '../env.js'

const app = new Clarifai.App({
  apiKey: `${process.env.CLIENT_KEY}`
});

export const handleApiCall = ((req, res) => {
  console.log(req.body.input)
  app.models
    .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
    .then(data => res.json(data))
    .catch(error => {
      console.log(error)
      return res.status(400).json('unable to work with API')
    })
})

export const handleImage = (req, res, db) => {
  const { id } = req.body;
  db('users')
    .where('id', '=', id)
    .increment('entries', 1)
    .returning('entries')
    .then(entries => {
      return res.json(entries[0])
    })
    .catch(error => {
      console.log(error)
      return res.status(400).json('unable to get entries')
    })
}