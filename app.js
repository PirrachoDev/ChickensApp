const express = require('express');
const app = express();
const ejsMate = require('ejs-mate');
const path = require('path');

const chickensRoutes = require('./routes/chickens');
const usersRoutes = require('./routes/users');

const morgan = require('morgan');
const methodOverride = require('method-override');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');
const localStrategy = require('passport-local');
const User = require('./models/users');
const Sequelize = require('sequelize');


//SQLITE3 DB CONNECTION

const sequelize = new Sequelize('sqlite:chickensApp2');
sequelize.authenticate().then(() => {
  console.log('SQLITE3 DB CONNECTED.');
}).catch((error) => {
  console.error('ERROR: UNABLE TO CONNECTED TO DB: ', error);
});




app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

const sessionConfig = {
  secret: 'secretWorld',
  resave: false,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
    expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
    maxAge: 1000 * 60 * 60 * 24 * 7
  }
}
app.use(session(sessionConfig));
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
//passport.use(new localStrategy(User.authenticate()));
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  res.locals.success = req.flash('success');
  res.locals.error = req.flash('error');
  next();
})


app.get('/', (req, res) => {
  res.render('index');
})

app.get('/fakeUser', async (req, res) => {
  const user = User.build({ email: 'pirrunia_ugly@yahoo.com', username: 'Pirrunia' });
  const regUser = await User.register(user, 'Pirrunia@2022');
  res.send(regUser);
})

app.use('/chickens', chickensRoutes);
app.use('/', usersRoutes);


app.listen(3000, () => {
  console.log('SERVING PORT 3000');
})