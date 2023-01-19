import express from 'express';
import bodyParser from 'body-parser';
import cookieparser from 'cookie-parser';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import { MongoClient, ObjectId } from 'mongodb';
import bcrypt from 'bcrypt';
import cors from 'cors';
import winston from 'winston';
import fs from 'fs/promises';

dotenv.config();

// ----------------- LOGGER -----------------
const logger = winston.createLogger({
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: 'changelog.log' }),
    ],
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
    )
});

if (process.env.NODE_ENV !== 'production') {
    logger.add(new winston.transports.Console({
        format: winston.format.simple(),
    }));
}

// ----------------- MONGODB -----------------
const ConnectionURL = 'mongodb://admin:admin@localhost:27017/';
const client = new MongoClient(ConnectionURL);
await client.connect()

// ----------------- AUTH -----------------
export function jwtAuthMiddleware(req, res, next) {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).send('Unauthorized: No token provided');
    }
    try {
        // Remove jwt= from token if it exists
        const tokenWithoutPrefix = token.replace('jwt=', '').trim();
        const decoded = jwt.verify(tokenWithoutPrefix, process.env.JWT_SECRET);
        req.user = decoded;
    } catch (err) {
        return res.status(401).send('Unauthorized: Invalid token XoX');
    }
    next();
}

export async function basicAuthMiddleware(req, res, next) {
    const b64auth = (req.headers.authorization || '').split(' ')[1] || '';
    console.log(b64auth);
    const [login, password] = Buffer.from(b64auth, 'base64').toString().split(':');
    console.log(login, password)
    if (!login || !password) {
        return res.status(401).send('Unauthorized: No login or password provided');
    }
    try {
        const collection = client.db("wg").collection("users");
        const user = await collection.findOne({ user: login });
        if (!user) {
            return res.status(401).send('Unauthorized: Invalid login');
        }
        const match = await compare(password, user.password);
        if (!match) {
            return res.status(401).send('Unauthorized: Invalid password');
        }
        req.user = user;
        next();
    } catch (err) {
        return res.status(401).send('Unauthorized: Invalid login or password');
    }
}

export async function compare(password, hash) {
    try {
        const match = await bcrypt.compare(password, hash);
        return match;
    } catch (err) {
        console.log(err);
        return null;
    }
}

async function encrypt(password) {
    const saltRounds = 10;
    try {
        const salt = await bcrypt.genSalt(saltRounds);
        const hash = await bcrypt.hash(password, salt);
        return hash;
    } catch (err) {
        console.log(err);
        return null;
    }
}


// ----------------- ROUTES -----------------
const app = express();
app.use(express.json());
app.use(cookieparser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// logger
app.use((req, res, next) => {
    console.log(`${req.method} ${req.path}`);
    next();
});

app.use(express.static('public'));
app.use(cors({ origin: 'http://wg.rwuwu.de', credentials: true }));


// ----------------- SETUP -----------------

app.post('/api/setup', async (req, res) => {
    // Check for bearer token in header and if it is valid to process.env.BEARER
    const bearer = req.headers.authorization;
    if (bearer !== 'Bearer ' + process.env.BEARER) {
        return res.status(401).send('Unauthorized: Invalid bearer token');
    }

    // Create db "wg" and collections "users", "todos", "shoppinglist" and "raumplan"
    try {
        const db = client.db("wg");
        await db.createCollection("users");
        await db.createCollection("todos");
        await db.createCollection("shoppinglist");
        await db.createCollection("raumplan");
        const collection = client.db("wg").collection("users");
        // Creat user ddoge with password ddoge
        const hash = await encrypt('ddoge');
        const user = {
            user: 'ddoge',
            password: hash,
        };
        await collection.insertOne(user);

        res.send(result);
    } catch (err) {
        res
            .status(500)
            .send('Internal Server Error: ' + err);
    }
});

// ----------------- LOGS -----------------
app.get('/api/logs', jwtAuthMiddleware, async (req, res) => {
    const logs = await fs.readFile('changelog.log', 'utf8');
    res.send(logs);
});

// ----------------- TODO -----------------
app.get('/api/todo', jwtAuthMiddleware, async (req, res) => {
    const collection = client.db("wg").collection("todo");
    const result = await collection.find({}).toArray();
    res.send(result);
});

app.post('/api/todo', jwtAuthMiddleware, async (req, res) => {
    const collection = client.db("wg").collection("todo");
    const result = await collection.insertOne(req.body);
    logger.info(`${req.user.user} inserted todo: ${result.insertedId} - ${req.body.task}`)
    res.send(result);
});


app.put('/api/todo/:id', jwtAuthMiddleware, async (req, res) => {
    const collection = client.db("wg").collection("todo");
    const result = await collection.updateOne({ _id: ObjectId(req.params.id.trim()) }, { $set: req.body });
    logger.info(`${req.user.user} updatet todo: ${req.params.id} to ${req.body.completed}`)
    res.send(result);
});

app.delete('/api/todo/:id', jwtAuthMiddleware, async (req, res) => {
    const collection = client.db("wg").collection("todo");
    const result = await collection.deleteOne({ _id: ObjectId(req.params.id.trim()) });
    logger.info(`${req.user.user} deleted todo: ${req.params.id}`)
    res.send(result);
});

// ----------------- SHOPPING -----------------
app.post('/api/shopping', jwtAuthMiddleware, async (req, res) => {
    const collection = client.db("wg").collection("shopping");
    const result = await collection.insertOne(req.body);
    logger.info(`${req.user.user} inserted shopping entry: ${result.insertedId} - ${req.body.task}`)
    res.send(result);
});

app.get('/api/shopping', jwtAuthMiddleware, async (req, res) => {
    const collection = client.db("wg").collection("shopping");
    const result = await collection.find({}).toArray();
    res.send(result);
});

app.put('/api/shopping/:id', jwtAuthMiddleware, async (req, res) => {
    const collection = client.db("wg").collection("shopping");
    const result = await collection.updateOne({ _id: ObjectId(req.params.id.trim()) }, { $set: req.body });
    logger.info(`${req.user.user} updatet shopping entry: ${req.params.id} to ${req.body.completed}`)
    res.send(result);
});

app.delete('/api/shopping/:id', jwtAuthMiddleware, async (req, res) => {
    const collection = client.db("wg").collection("shopping");
    const result = await collection.deleteOne({ _id: ObjectId(req.params.id.trim()) });
    logger.info(`${req.user.user} deleted shopping entry: ${req.params.id}`)
    res.send(result);
});

// ----------------- SCHEDULE -----------------
app.post('/api/schedule', jwtAuthMiddleware, async (req, res) => {
    const collection = client.db("wg").collection("raumplan");
    const added = req.body.added;
    const deleted = req.body.deleted;
    const changed = req.body.changed;

    // Check if object added is not empty
    if (added != undefined && added?.length > 0) {
        const add = await collection.insertOne(added[0]);
        logger.info(`${req.user.user} inserted schedule entry: ${add.insertedId} - ${added[0].Subject}, starting on ${added[0].StartTime} and ending on ${added[0].EndTime}`)
        res.send(add);
        return;
    }
    if (deleted != undefined && deleted?.length > 0) {
        const result = await collection.deleteOne({ _id: ObjectId(deleted[0]._id.trim()) });
        logger.info(`${req.user.user} deleted schedule entry: ${deleted[0]._id}`)
        res.send(result);
        return;
    }
    if (changed != undefined && changed?.length > 0) {
        const id = changed[0]._id.trim();
        delete changed[0]._id;
        const result = await collection.updateOne({ _id: ObjectId(id) }, { $set: changed[0] });
        logger.info(`${req.user.user} updatet schedule entry: ${id} to ${changed[0].Subject}, starting on ${changed[0].StartTime} and ending on ${changed[0].EndTime}`)
        res.send(result);
        return;
    }

    const result = await collection.find({}).toArray();
    res.send(result);
});

// ----------------- USERS -----------------
app.post('/api/login', basicAuthMiddleware, (req, res) => {
    const token = jwt.sign({
        user: req.user.user,
        is_admin: req.user.is_admin,
        timestamp: new Date()
    }, process.env.JWT_SECRET, { expiresIn: '4w' });
    res.cookie('token', token, { httpOnly: true, sameSite: 'none', maxAge: 1000 * 60 * 60 * 24 * 28, secure: true });
    res.send({
        jwt: token,
        is_admin: req.user.is_admin
    });
});

app.post('/api/logout', (req, res) => {
    res.clearCookie('token');
    res.send('OK');
});

app.post('/api/changePassword', jwtAuthMiddleware, async (req, res) => {
    const collection = client.db("wg").collection("users");
    // Encrypt password
    const hash = await encrypt(req.body.password);
    const newUser = {
        user: req.user.user,
        password: hash
    }
    const result = collection.updateOne({ user: req.user.user }, { $set: newUser });
    res.send(result);
});

app.post('/api/setAdmin/:id/:admin', jwtAuthMiddleware, async (req, res) => {
    // Check if user is admin
    if (req.user.is_admin) {
        const collection = client.db("wg").collection("users");
        const result = await collection.updateOne({ _id: ObjectId(req.params.id.trim()) }, { $set: { is_admin: req.params.admin } });
        const user = await collection.findOne({ _id: ObjectId(req.params.id.trim()) });
        logger.info(`${req.user.user} set admin rights for ${user.user} to ${req.params.admin}`)
        res.send(result);
    } else {
        res.status(403).send('Forbidden');
    }
});


app.post('/api/user', jwtAuthMiddleware, async (req, res) => {
    if (req.user.is_admin) {
        // Find out if user already exists in collection
        const collection = client.db("wg").collection("users");
        const findUser = await collection.findOne({ user: req.body.user });
        if (findUser) {
            res.status(409).send('User already exists');
            return;
        }
        const hash = await encrypt(req.body.password);
        const newUser = {
            user: req.body.user,
            password: hash,
            is_admin: req.body.is_admin
        }
        logger.info(`${req.user.user} created new user: ${req.body.user}`)
        const result = await collection.insertOne(newUser);
        res.send(result);
    } else {
        res.status(403).send('Forbidden');
    }
});

app.get('/api/user', jwtAuthMiddleware, async (req, res) => {
    if (req.user.is_admin) {
        const collection = client.db("wg").collection("users");
        const result = await collection.find({}).toArray();
        // Remove password from result
        result.forEach((user) => {
            delete user.password;
        });
        res.send(result);
    } else {
        res.status(403).send('Forbidden');
    }
});

app.delete('/api/user/:id', jwtAuthMiddleware, async (req, res) => {
    if (req.user.is_admin) {
        const collection = client.db("wg").collection("users");
        const result = await collection.deleteOne({ _id: ObjectId(req.params.id.trim()) });
        logger.info(`${req.user.user} deleted user: ${req.params.id}`)
        res.send(result);
    } else {
        res.status(403).send('Forbidden');
    }
});

const PORT = process.env.EXPRESS_PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});

