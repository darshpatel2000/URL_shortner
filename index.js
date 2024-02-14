const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const {connectToMongo} = require('./connection');
const {checkForAuthentication, restrictTo} = require('./middleware/auth');

const URL = require('./models/url');

const urlRoutes = require('./routes/url');
const  staticRoutes = require('./routes/staticRouter');
const userRoutes = require('./routes/user');

connectToMongo('mongodb://127.0.0.1:27017/short-url')
.then( () => console.log('connected to mongodb'));

const app = express();
const PORT = 8001;

app.set('view engine', 'ejs');
app.set('views', path.resolve('./views'));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser())
app.use(checkForAuthentication);

app.use('/url',restrictTo(["NORMAL"]), urlRoutes);
app.use('/user', userRoutes);
app.use('/', staticRoutes);




app.listen(PORT,()=>console.log(`server listening on ${PORT}`));