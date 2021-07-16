const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const { sessionStore } = require('./config/db');
const auth = require('./router/auth');
const dashboard = require('./router/dashboard');
const liveData = require('./router/liveAnalysis');
const historicalData = require('./router/historicalAnalysis');
const settings = require('./router/settings');
const { loginRequired } = require('./controller/auth.controller');

require('dotenv').config({ path: path.join(__dirname, '.env') })
const port = process.env.PORT || 4000;


const app = express();

app.use(express.json());
// parse application/json
app.use(bodyParser.json())
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
    extended: false
}));

// set view engine
app.set("views", path.join(__dirname, 'views'));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, 'public')));


app.use(require('connect-flash')());
app.use((req, res, next) => {
    res.locals.messages = require('express-messages')(req, res);
    next();
});

var sess = {
    secret: 'Fn46_+hbx1h675&0',
    store: sessionStore,
    cookie: {
        maxAge: 1000 * 60 * 60 * 12,
        httpOnly: false,
    },
    resave: false,
    saveUninitialized: false
};


app.use(session(sess));


app.get('/', loginRequired, (req, res) => {
    res.redirect('/dashboard');
})

app.use('/auth', auth);
app.use('/', dashboard);
app.use('/', liveData);
app.use('/', historicalData);
app.use('/', settings);
app.listen(port, () => console.log(`listening on http://${process.env.HOST}:${port}`));
