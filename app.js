const express = require('express');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.APP_PORT || 3000;
const pjson = require('./package.json');

// ========================
// Set up routes here
require('./app/routes/main')(app);



// End of routes setup
// ========================

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));

// App start
app.listen(port, () => console.log(`${pjson.name} ${pjson.version} listening on port ${port}!`));