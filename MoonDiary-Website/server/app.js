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

mongoose.connect(process.env.MONGODB_URI)
.then(() => {
  console.log('✅ Connected to MongoDB');
}).catch((err) => {
  console.error('❌ Failed to connect to MongoDB', err);
});

const allowedOrigins = [
  'https://vortexa-2-0-hackathon.vercel.app', 
  'https://journee-498435245361.asia-south1.run.app',
  'http://localhost:5173',
];

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
};

app.use(cors(corsOptions));
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.options('*', cors(corsOptions));

app.set('trust proxy', 1);

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
      secure: true,
      sameSite: 'none',
      maxAge: 30 * 24 * 60 * 60 * 1000,
    },
  })
);

// Passport initialization
app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.use('/api/users', userRoutes);
app.use('/api/ai', aiRoutes);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
