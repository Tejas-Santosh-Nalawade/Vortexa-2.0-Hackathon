const dotenv = require('dotenv');
dotenv.config({ path: './.env' });

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const passport = require('./config/passport.js');
const mongoose = require('mongoose');

const userRoutes = require('./routes/user');
const aiRoutes = require('./routes/ai');

const app = express();

// --- MongoDB connection ---
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ Connected to MongoDB'))
.catch(err => console.error('❌ Failed to connect to MongoDB', err));

// --- CORS configuration ---
const allowedOrigins = [
  'https://vortexa-2-0-hackathon.vercel.app', 
  'https://vortexa-2-0-hackathon-7hnq.vercel.app',
  'http://localhost:5173',
];

app.use(cors({
  origin: function(origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
}));

// --- Middleware ---
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Handle preflight requests for all routes
app.options('*', cors());

// --- Session configuration ---
app.set('trust proxy', 1); // needed if behind a proxy (like Vercel)

app.use(
  session({
    secret: process.env.SESSION_SECRET || 'my-super-secret-key',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.MONGODB_URI,
      collectionName: 'sessions',
    }),
    cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // true in prod
      sameSite: 'none', // needed for cross-origin cookies
      maxAge: 30 * 24 * 60 * 60 * 1000,
    },
  })
);

// --- Passport ---
app.use(passport.initialize());
app.use(passport.session());

// --- Routes ---
app.get('/', (req, res) => res.send('Hello, World!'));
app.use('/api/users', userRoutes);
app.use('/api/ai', aiRoutes);

// --- Start server ---
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
