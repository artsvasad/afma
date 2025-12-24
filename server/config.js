import 'dotenv/config'; // Load env vars immediately when this file is imported

export const MONGO_URI = process.env.MONGO_URI;
export const JWT_SECRET = process.env.JWT_SECRET;
export const CLIENT_URI = process.env.CLIENT_URI;