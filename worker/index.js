const keys = require('./keys');
const redis = require('redis');

const redisClient = redis.createClient({
  url: `redis://${keys.redisHost}:${keys.redisPort}`
});
redisClient.connect().then(() => {
  console.log("Worker, Connected to redis");
});
redisClient.on("error", (err) => console.log("Worker, Redis Client Error", err));

const subscriber = redisClient.duplicate();
subscriber.connect();


const fib = (index) => {
  if (index < 2) return 1;
  return fib(index - 1) + fib(index - 2);
}

subscriber.subscribe("insert", (message) => {
  redisClient.hSet('values', message, fib(parseInt(message)));
});

