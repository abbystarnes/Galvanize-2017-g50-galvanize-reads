'use strict'

const environment = process.env.NODE_ENV || 'development';
const config = require('../knexfile.js')[environment];
const pg = require('pg');

module.exports = require('knex')(config)
