const express = require('express')
const app = express()

// enable env variable
require('dotenv').config()

// database connection
require('./connection').sync;

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`)
})