const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('sqlite:chickensApp2');
sequelize.authenticate().then(() => {
  console.log('SQLITE3 DB CONNECTED.');
}).catch((error) => {
  console.error('ERROR: UNABLE TO CONNECTED TO DB: ', error);
});

const Comment = sequelize.define('comments', {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
  },
  body: DataTypes.STRING
})

sequelize.sync().then(() => {
  console.log('COMMENT TABLE CREATED SUCCESSFULLY!');
}).catch((error) => {
  console.error('UNABLE TO CREATE TABLE : ', error);
});

module.exports = Comment;