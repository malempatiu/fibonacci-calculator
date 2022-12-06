const keys = require('./keys');
const express = require('express');
const cors = require('cors');
const { Client } = require('pg');
const redis = require('redis');

const app = express();
app.use(cors());
app.use(express.json());

const pgClient = new Client({
  user: keys.pgUser,
  host: keys.pgHost,
  database: keys.pgDatabase,
  password: keys.pgPassword,
  port: keys.pgPort
});
pgClient.on('error', () => console.log('Server, lost PG connection'));
pgClient
  .connect()
  .then(() => {
    pgClient
      .query("CREATE TABLE IF NOT EXISTS values (number INT)")
      .catch((err) => console.error(err));
  })
  .catch((err) => console.error("connection error", err.stack));

const redisClient = redis.createClient({
  url: `redis://${keys.redisHost}:${keys.redisPort}`,
});
redisClient.on("error", (err) =>
  console.log("Server, Redis Client Error", err)
);
const redisPublisher = redisClient.duplicate();

app.get('/', (req, res) => {
  return res.status(200).json({ message: 'Fibonacci Calculator' });
});

app.get('/api/values/all', async (req, res) => {
  const values = await pgClient.query('SELECT * FROM values');
  return res.status(200).json({ rows: values.rows });
});

app.get("/api/values/current", async (req, res) => {
  const values = await redisClient.hGetAll("values");
  return res.status(200).json({ values });
});

app.post("/api/values", async (req, res) => {
  if (req.body.index > 40) return res.status(422).json({error: 'Index to high'});
  await redisClient.hSet('values', req.body.index, 'Nothing yet!');
  await redisPublisher.publish("insert", req.body.index);
  await pgClient.query("INSERT INTO values(number) VALUES($1)", [req.body.index]);
  return res.status(200).json({ message: "Calculating..." });
});

app.listen(5000, () => {
  console.log('Server listening on port: 5000');
})