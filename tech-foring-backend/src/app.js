
const cookieParser = require('cookie-parser');
const express = require('express');
const session = require('express-session');
const app = express()
const cors = require('cors');
const apiV1 = require('./routes/apiVersion');
var bodyParser = require('body-parser');
const { tokenParser } = require('./middlewares/globalMid/tokenParser');
const { accessTokenMiddleware } = require('./middlewares/accesToken');
const { authorization } = require('./middlewares/authorization');

const oneDay = 1000 * 60 * 60 * 24;
// app.use(session({
//     secret: process.env['SESSION_SECRET'] || 'secret',
//     resave: false,
//     saveUninitialized: true,
//     cookie: { maxAge: oneDay },
//     signed: false,
// }))

const allowedOrigins = ["https://tech-foring-job-portal-1.onrender.com", "https://techforing-test.netlify.app"];
const expressOptions = {
  urlencodExtended: true,
  requestSizeLimit: "20mb",
};
const corsOption = {
  allowedHeaders: [
    "Origin",
    "X-Requested-With",
    "Content-Type",
    "Accept",
    "X-Access-Token",
    "X-Auth-Token",
    "Authorization",
    "Accept-Encoding",
    "Connection",
    "Content-Length",
  ],
  credentials: true,
  methods: "GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE",
  origin: allowedOrigins,
  preflightContinue: false,
};

app.get('/', (req, res) => {
    res.send('Hello World!')
})



app.use(express.json({ limit: expressOptions.requestSizeLimit }))
app.use(express.urlencoded({ extended: true}))
app.use(express.static('public'))
app.use(cookieParser())
app.use(cors(corsOption))
// app.use(authorization)
app.use("/api/v1", apiV1);
app.use("/api/v1/verify", accessTokenMiddleware);
app.use('/api/v1/users/verify/:token', tokenParser)
app.use((err, req, res, next) => {
    console.log(err); // Access error message here
    res.status(500).send(err);
  });
module.exports = app