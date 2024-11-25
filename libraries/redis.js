const redis = require('redis');

let redisClient;

const connectRedis = async () => {
  redisClient = redis.createClient({
    // You can add additional configuration options here if needed
    // url: 'redis://localhost:6379'
  });

  redisClient.on('error', (error) => {
    console.error('Error :', error);
    // Implement reconnection logic
    if (error.code === 'ECONNREFUSED') {
      setTimeout(connectRedis, 5000); // Try reconnecting after 5 seconds
    }
  });

  redisClient.on('connect', () => console.log(':::> Connected to Redis database'));
  redisClient.on('ready', () => console.log(':::> Redis client is ready'));
  redisClient.on('end', () => console.log(':::> Redis client disconnected'));

  await redisClient.connect();
};

connectRedis();

module.exports = redisClient;
