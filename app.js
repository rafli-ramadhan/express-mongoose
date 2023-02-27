const express = require('express')
const app = express()
const morgan = require('morgan')
const createError = require('http-errors')

// enable env variable
require('dotenv').config()

// cors
const cors = require('cors');
app.use(cors());

app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// swagger
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require("swagger-ui-express");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Express Rest API",
      version: "1.0",
      description: "Express Rest API",
    },
    servers: [
      {
        url: "http://localhost:5000",
      },
    ],
  },
  apis: ["./routes/*.js"],
};

const specs = swaggerJsDoc(options);

// db connection
require('./helpers/init_mongodb').sync;

// route
const authRoute = require('./routes/auth.route')
const crudRoute = require('./routes/crud.route')
app.use('/api', authRoute)
app.use('/api', crudRoute)
app.use(
  '/swagger',
  swaggerUi.serve,
  swaggerUi.setup(specs)
);

app.use(async (req, res, next) => {
  next(createError.NotFound())
})

app.use((err, req, res, next) => {
  res.status(err.status || 500)
  res.send({
    error: {
      status: err.status || 500,
      message: err.message,
    },
  })
})

// server
const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

