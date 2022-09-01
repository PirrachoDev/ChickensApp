const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('sqlite:chickensApp2');
/*sequelize.authenticate().then(() => {
  console.log('SQLITE3 DB CONNECTED.');
}).catch((error) => {
  console.error('ERROR: UNABLE TO CONNECTED TO DB: ', error);
});*/

const Chicken = sequelize.define('chickens', {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
  },
  name: DataTypes.STRING,
  breed: DataTypes.STRING,
  imgUrl: DataTypes.STRING,
  weight: DataTypes.INTEGER,
  birthday: DataTypes.STRING,
});

/*sequelize.sync().then(() => {
  console.log('CHICKEN TABLE CREATED SUCCESSFULLY!');
}).catch((error) => {
  console.error('UNABLE TO CREATE TABLE : ', error);
});*/

module.exports = Chicken;