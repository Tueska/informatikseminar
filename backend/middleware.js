import jwt from 'jsonwebtoken';
import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';

dotenv.config();

// ----------------- MONGODB -----------------
const ConnectionURL = 'mongodb://admin:admin@localhost:27017/';
const client = new MongoClient(ConnectionURL);
await client.connect()

