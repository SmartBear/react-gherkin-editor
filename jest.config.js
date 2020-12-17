const neutrino = require('neutrino')

// Set a default NODE_ENV before loading any middleware
process.env.NODE_ENV = process.env.NODE_ENV || 'test'

module.exports = neutrino().jest()
