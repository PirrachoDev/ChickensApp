const Sequelize = require('sequelize');
const passportLocalSequelize = require('passport-local-sequelize');
const myDB = new Sequelize('sqlite:chickensApp2');
/*
sequelize.authenticate().then(() => {
  console.log('SQLITE3 DB CONNECTED.');
}).catch((error) => {
  console.error('ERROR: UNABLE TO CONNECTED TO DB: ', error);
});
*/

const User = passportLocalSequelize.defineUser(myDB, {
  email: Sequelize.STRING
});

/*
sequelize.sync().then(() => {
  console.log('USER TABLE CREATED SUCCESSFULLY!');
}).catch((error) => {
  console.error('UNABLE TO CREATE TABLE : ', error);
});
*/

module.exports = User;