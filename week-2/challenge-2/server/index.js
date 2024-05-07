import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import jwt from 'jsonwebtoken';
import axios from 'axios';
import queryString from 'query-string';
import 'dotenv/config';

const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: [process.env.CLIENT_URL],
    credentials: true,
}));

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/kmit')
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Error connecting to MongoDB:', err));

// Schema for the counters
const counterSchema = new mongoose.Schema({
    count: { type: Number, default: 0 },
    myCount: { type: Number, default: 0 }
}, { collection: 'counters' });
const Counter = mongoose.model('Counter', counterSchema);

// Schema for the user profile
// Schema for the user profile
const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    picture: String,
    counter: {  // Changed from counterArray to a singular counter object
        count: { type: Number, default: 0 },
        myCount: { type: Number, default: 0 }
    }
}, { collection: 'users' });

const User = mongoose.model('User', userSchema);


// OAuth configuration
const config = {
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    authUrl: 'https://accounts.google.com/o/oauth2/auth',
    tokenUrl: 'https://oauth2.googleapis.com/token',
    redirectUrl: process.env.REDIRECT_URL,
    clientUrl: process.env.CLIENT_URL,
    tokenSecret: process.env.TOKEN_SECRET,
    tokenExpiration: 36000,
    postUrl: 'https://jsonplaceholder.typicode.com/posts'
};

const authParams = queryString.stringify({
    client_id: config.clientId,
    redirect_uri: config.redirectUrl,
    response_type: 'code',
    scope: 'openid profile email',
    access_type: 'offline',
    state: 'standard_oauth',
    prompt: 'consent',
});


// Authentication middleware
const auth = (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) return res.status(401).json({ message: 'Unauthorized' });
        jwt.verify(token, config.tokenSecret);
        return next();
    } catch (err) {
        console.error('Error: ', err);
        res.status(401).json({ message: 'Unauthorized' });
    }
};

// Routes
app.get('/api/counter/:email', async (req, res) => {
    try {
        const userEmail = req.params.email;
        const user = await User.findOne({ email: userEmail });
        console.log(user)
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        if (!user.counter) {
            return res.status(404).json({ message: "Counter not found" });
        }
        res.json({ count: user.counter.count, myCount: user.counter.myCount });
    } catch (err) {
        console.error("Error retrieving counter:", err);
        res.status(500).json({ message: 'Server Error' });
    }
});


// Increment Counter
app.post('/api/counter/increment', async (req, res) => {
    const userEmail = req.body.email;
    if (!userEmail) {
        console.log("Email not provided in the request body");
        return res.status(400).json({ message: "Email is required" });
    }
    try {
        const user = await User.findOneAndUpdate(
            { email: userEmail },
            { $inc: { 'counter.count': 1 } },
            { new: true }
        );
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json({ count: user.counter.count, myCount: user.counter.myCount });
    } catch (err) {
        console.error("Error incrementing counter:", err);
        res.status(500).json({ message: 'Server Error' });
    }
});


// Decrement Counter
app.post('/api/counter/decrement', async (req, res) => {
    const userEmail = req.body.email;
    try {
        const user = await User.findOneAndUpdate(
            { email: userEmail },
            { $inc: { 'counter.count': -1 } }, // Atomically decrements the counter
            { new: true }
        );
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json({ count: user.counter.count, myCount: user.counter.myCount });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
});
// Increment MyCounter
app.post('/api/mycounter/increment', async (req, res) => {
    const userEmail = req.body.email;
    try {
        const user = await User.findOneAndUpdate(
            { email: userEmail },
            { $inc: { 'counter.myCount': 1 } },
            { new: true }
        );
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json({ count: user.counter.count, myCount: user.counter.myCount });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
});

// Decrement MyCounter
app.post('/api/mycounter/decrement', async (req, res) => {
    const userEmail = req.body.email;
    try {
        const user = await User.findOneAndUpdate(
            { email: userEmail },
            { $inc: { 'counter.myCount': -1 } },
            { new: true }
        );
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json({ count: user.counter.count, myCount: user.counter.myCount });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
});




// POST routes for /api/counter/increment, /api/counter/decrement, etc.
// Similar to your existing POST routes

// OAuth routes
app.get('/auth/url', (_, res) => {
    res.json({ url: `${config.authUrl}?${authParams}` });
});


// app.get('/auth/url', (_, res) => {
//     const targetUrl = `https://accounts.google.com/o/oauth2/auth?redirect_uri=${encodeURIComponent(
//         config.redirectUrl
//     )}&response_type=token&client_id=${config.clientId}&scope=openid%20email%20profile`;
//     // console.log(targetUrl)
//     res.json({
//         url: targetUrl,
//     })
// })
function getTokenParams(code) {
    return queryString.stringify({
        client_id: config.clientId,
        client_secret: config.clientSecret,
        code,
        grant_type: 'authorization_code',
        redirect_uri: config.redirectUrl,
    });
}

app.get('/auth/url', (_, res) => {
    res.json({
        url: `${config.authUrl}?${authParams}`,
    })
})

app.get('/auth/token', async (req, res) => {
    const { code } = req.query;
    if (!code) return res.status(400).json({ message: 'Authorization code must be provided' });
    try {
        const tokenParams = getTokenParams(code);
        const response = await axios.post(`${config.tokenUrl}?${tokenParams}`);
        const { id_token } = response.data;
        if (!id_token) return res.status(400).json({ message: 'Auth error' });
        const { email, name, picture } = jwt.decode(id_token);
        
        // Find or create user based on email
        let user = await User.findOne({ email });
        if (!user) {
            user = new User({ email, name, picture });
            await user.save();
        }

        // Find or create counter associated with user
        let counter = await Counter.findOne({ user: user._id });
        if (!counter) {
            counter = new Counter({ user: user._id });
            await counter.save();
        }

        const token = jwt.sign({ user }, config.tokenSecret, { expiresIn: config.tokenExpiration });
        res.cookie('token', token, { maxAge: config.tokenExpiration, httpOnly: true });
        res.json({ user });
    } catch (err) {
        console.error('Error: ', err);
        res.status(500).json({ message: err.message || 'Server error' });
    }
});


app.get('/auth/logged_in', (req, res) => {
    try {
        // Get token from cookie        
        const token = req.cookies.token
        if (!token) return res.json({ loggedIn: false })
        const { user } = jwt.verify(token, config.tokenSecret)
        const newToken = jwt.sign({ user }, config.tokenSecret, { expiresIn: config.tokenExpiration })
        // Reset token in cookie
        res.cookie('token', newToken, { maxAge: config.tokenExpiration, httpOnly: true })
        res.json({ loggedIn: true, user })
    } catch (err) {
        res.json({ loggedIn: false })
    }
})

app.post('/auth/logout', (_, res) => {
    // clear cookie
    res.clearCookie('token').json({ message: 'Logged out' })
})

app.get('/user/posts', auth, async (_, res) => {
    try {
        const { data } = await axios.get(config.postUrl)
        res.json({ posts: data?.slice(0, 5) })
    } catch (err) {
        console.error('Error: ', err)
    }
})

const PORT = process.env.PORT || 9000
app.listen(PORT, () => console.log(`🚀 Server listening on port ${PORT}`))
//index