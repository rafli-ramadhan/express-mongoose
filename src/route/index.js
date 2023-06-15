const express = require('express')
const app = express()
const morgan = require('morgan')
const createError = require('http-errors')
const cors = require('cors');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require("swagger-ui-express");
const authRoute = require('./auth')
const crudRoute = require('./crud')

// cors
app.use(cors());

// middleware
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// swagger
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

// endpoint
app.use('/v1', authRoute)
app.use('/v1', crudRoute)
app.use('/swagger', swaggerUi.serve, swaggerUi.setup(specs));

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
