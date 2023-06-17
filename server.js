/* eslint-disable @typescript-eslint/no-var-requires */
const express = require('express')
const { Nuxt } = require('nuxt')

const config = require('./nuxt.config.js')

// Create new express app
const app = express()

// Listen to port 3000 or PORT env if provided
app.listen(process.env.PORT || 3000)

// Enable production mode
config.dev = false

// Create instance of nuxt
const nuxt = new Nuxt(config)

// Add nuxt middleware
app.use(nuxt.render)