import express from 'express';
import bodyParser from 'body-parser';
import cookieparser from 'cookie-parser';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import { MongoClient, ObjectId } from 'mongodb';
import bcrypt from 'bcrypt';

dotenv.config();

// ----------------- MONGODB -----------------
const ConnectionURL = 'mongodb://admin:admin@localhost:27017/';
const client = new MongoClient(ConnectionURL);
await client.connect()

// ----------------- AUTH -----------------
const jwtAuthMiddleware = (req, res, next) => {
    const token = req.cookies.token || req.headers['calcookie']
    console.log(token);
    if (!token) {
        return res.status(401).send('Unauthorized: No token provided');
    }
    try {
        // Remove jwt= from token if it exists
        const tokenWithoutPrefix = token.replace('jwt=', '');
        const decoded = jwt.verify(tokenWithoutPrefix, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(401).send('Unauthorized: Invalid token');
    }
};

const basicAuthMiddleware = async (req, res, next) => {
    const b64auth = (req.headers.authorization || '').split(' ')[1] || ''
    const [login, password] = Buffer.from(b64auth, 'base64').toString().split(':')
    if (!login || !password) {
        return res.status(401).send('Unauthorized: No login or password provided');
    }
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
};

async function encrypt(password) {
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(password, salt);
    return hash;
}

async function compare(password, hash) {
    const match = await bcrypt.compare(password, hash);
    return match;
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
// Allow CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:8080');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.header('Access-Control-Allow-Credentials', 'true');
    next();
});

// ----------------- TODO -----------------
app.post('/api/todo', jwtAuthMiddleware, async (req, res) => {
    const collection = client.db("wg").collection("todo");
    const result = await collection.insertOne(req.body);
    res.send(result);
});

app.get('/api/todo', jwtAuthMiddleware, async (req, res) => {
    const collection = client.db("wg").collection("todo");
    const result = await collection.find({}).toArray();
    res.send(result);
});

app.put('/api/todo/:id', jwtAuthMiddleware, async (req, res) => {
    const collection = client.db("wg").collection("todo");
    const result = await collection.updateOne({ _id: ObjectId(req.params.id.trim()) }, { $set: req.body });
    res.send(result);
});

app.delete('/api/todo/:id', jwtAuthMiddleware, async (req, res) => {
    const collection = client.db("wg").collection("todo");
    const result = await collection.deleteOne({ _id: ObjectId(req.params.id.trim()) });
    res.send(result);
});

// ----------------- SHOPPING -----------------
app.post('/api/shopping', async (req, res) => {
    const collection = client.db("wg").collection("shopping");
    const result = await collection.insertOne(req.body);
    res.send(result);
});

app.get('/api/shopping', async (req, res) => {
    const collection = client.db("wg").collection("shopping");
    const result = await collection.find({}).toArray();
    res.send(result);
});

app.put('/api/shopping/:id', async (req, res) => {
    const collection = client.db("wg").collection("shopping");
    const result = await collection.updateOne({ _id: ObjectId(req.params.id.trim()) }, { $set: req.body });
    res.send(result);
});

app.delete('/api/shopping/:id', async (req, res) => {
    const collection = client.db("wg").collection("shopping");
    const result = await collection.deleteOne({ _id: ObjectId(req.params.id.trim()) });
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
        console.log('ADDED');
        const add = await collection.insertOne(added[0]);
        res.send(add);
        return;
    }
    if (deleted != undefined && deleted?.length > 0) {
        console.log('DELETED');
        const result = await collection.deleteOne({ _id: ObjectId(deleted[0]._id.trim()) });
        res.send(result);
        return;
    }
    if (changed != undefined && changed?.length > 0) {
        console.log('CHANGED');
        const id = changed[0]._id.trim();
        delete changed[0]._id;
        console.log(changed[0]);
        const result = await collection.updateOne({ _id: ObjectId(id) }, { $set: changed[0] });
        res.send(result);
        return;
    }

    // Search for Items between req.body.StartDate and req.body.EndDate -> not working for recurrence rules
    // const result = await collection.find({
    //     $and: [
    //         { StartTime: { $gte: new Date(req.body.StartDate).toISOString() } },
    //         { EndTime: { $lte: new Date(req.body.EndDate).toISOString() } }
    //     ]
    // }).toArray();
    const result = await collection.find({}).toArray();
    res.send(result);
});

app.options('/api/schedule', (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
    res.send();
});

// ----------------- USERS -----------------
app.post('/api/login', basicAuthMiddleware, (req, res) => {
    const token = jwt.sign({
        user: req.user.user,
        is_admin: true,
        timestamp: new Date()
    }, process.env.JWT_SECRET, { expiresIn: '4w' });
    res.cookie('token', token, { httpOnly: true });
    res.send(token);
});

app.options('/api/login', (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
    res.send();
});

const PORT = process.env.EXPRESS_PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});

