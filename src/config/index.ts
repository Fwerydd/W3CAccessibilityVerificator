import dotenv from 'dotenv';

// config() will read your .env file, parse the contents, assign it to process.env.
dotenv.config({ path: "src/config/.env" });

export default {
    node_env: process.env.NODE_ENV,
    port: process.env.PORT,
}