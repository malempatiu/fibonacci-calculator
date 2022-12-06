const keys = require('./keys');
const redis = require('redis');

const redisClient = redis.createClient({
  url: `redis://${keys.redisHost}:${keys.redisPort}`
});

const subscriber = redisClient.duplicate();
subscriber.connect();


const fib = (index) => {
  if (index < 2) return 1;
  return fib(index - 1) + fib(index - 2);
}

subscriber.subscribe("insert", (message) => {
  redisClient.hSet('values', message, fib(parseInt(message)));
});

