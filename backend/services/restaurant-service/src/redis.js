const { createClient } = require("redis");

let client;
let connectPromise;

function getRedisUrl() {
  return process.env.REDIS_URL || "redis://localhost:6379";
}

async function getRedisClient() {
  if (!client) {
    client = createClient({ url: getRedisUrl() });

    client.on("error", (err) => {
      // Keep process alive; cache is optional.
      console.error("Redis client error:", err?.message || err);
    });
  }

  if (!connectPromise) {
    connectPromise = client.connect().catch((err) => {
      connectPromise = undefined;
      throw err;
    });
  }

  await connectPromise;
  return client;
}

module.exports = { getRedisClient };

