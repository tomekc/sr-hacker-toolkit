const express = require('express');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const app = express();
const session = require('express-session');
const port = process.env.PORT || 3000;
const pjson = require('./package.json');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(session({
    secret: 'drozd-zrywa-zurawine',
    resave: false,
    saveUninitialized: true,
    cookie: {}  // development settings
}));

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));

// ========================
// Set up routes here
require('./app/routes/main')(app);
require('./app/routes/auth')(app);
require('./app/routes/welcome')(app);
require('./app/routes/jobs')(app);
// End of routes setup
// ========================

// App start
app.listen(port, () => console.log(`${pjson.name} ${pjson.version} listening on port ${port}!`));