require('dotenv/config')

const express = require('express')
const app = express()

const { MovieDb } = require('moviedb-promise')
const moviedb = new MovieDb(process.env.TMDB_API_KEY)

const port = 1234

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Credentials', true)
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
  res.header(
    'Access-Control-Allow-Headers',
    'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json'
  )
  next()
})

app.get('/upcomingMovies', function (req, res) {
  moviedb
    .upcomingMovies()
    .then((data) => {
      res.json(data)
    })
    .catch(console.error)
})

app.get('/discover', function (req, res) {
  moviedb
    .discoverMovie()
    .then((data) => {
      res.json(data.results)
    })
    .catch(console.error)
})

app.get('/genres', function (req, res) {
  moviedb
    .genreMovieList()
    .then((data) => {
      res.json(data)
    })
    .catch(console.error)
})

app.listen(port)
