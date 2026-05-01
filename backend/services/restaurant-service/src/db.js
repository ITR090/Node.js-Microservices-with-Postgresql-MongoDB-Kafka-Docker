const { Client } = require('pg');

// PostgreSQL client setup
    const client = new Client({
        user: process.env.POSTGRES_USER,
        host: process.env.POSTGRES_HOST,
        database: process.env.POSTGRES_DB,
        password: process.env.POSTGRES_PASSWORD,
        port: process.env.POSTGRES_PORT,
    });

    let DB

// try {

//     // postgreSQL connection export
//     DB = client.connect().then(() => {
//         console.log("Connected to the postgreSQL database");
//     });

// } catch (error) {
//     console.error('Database connection error', error.stack);
// }

async function connectDB() {
  try {
    await client.connect();
    console.log("Connected to PostgreSQL database");
  } catch (err) {
    console.error("PostgreSQL connection failed", err);
    process.exit(1);
  }
}
connectDB()

module.exports = { DB, client };