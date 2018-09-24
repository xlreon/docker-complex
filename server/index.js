const keys = require('./keys')

// Express setup
const express = require('express')
const bodyParse = require('body-parser')
const cors = require('cors')

const app = express()
app.use(cors())
app.use(bodyParser.json())

// Postgres Client setup

const { Pool } = require('pg')
const pgClient = new Pool({
    user: keys.pgUser,
    password: keys.pgPassword,
    host: keys.pgHost,
    database: keys.pgDatabase,
    port: keys.pgPort
});

pgClient.on('error', () => console.log('Lost PG connection'));

pgClient.query('CREATE TABLE IF NOT EXISTS values (number INT)')
    .catch(err => console.log(err));

// Redis Client Setup

const redis = require('redis')
const redisClient = redis.createClinet({
    host: keys.redisHost,
    port: keys.redisPort
    retry_strategy: () => 1000 
})

const redisPublisher = redisClient.duplicate();
