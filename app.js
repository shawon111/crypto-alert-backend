const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const app = express();

// dotenv config
dotenv.config();

// port
const port = process.env.PORT || 5000;
// appp configuration
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// cors configuration
const allowedOrigins = ['http://localhost:8080',];

const corsOptions = {
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
};

app.use(cors(corsOptions));

// routes
const cryptoRoute = require('./src/routers/crypto.router');
const { checkAlerts } = require('./src/services/checkAlert.service');

app.use('/api/crypto', cryptoRoute)

app.get('/', (req, res) => {
    res.status(200).json({
        success: true,
        data: {
            message: "Crypto alarm backend"
        }
    })
})

// cron endpoint
app.get("/api/cron", async (req, res) => {
  try {
    await checkAlerts();

    return res.status(200).json({
      success: true,
      message: "Cron executed successfully",
    });
  } catch (err) {
    console.error("Cron error:", err);

    return res.status(500).json({
      success: false,
      error: err.message,
    });
  }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
    console.log(`Visit http://localhost:${port} to access the server`);
})
