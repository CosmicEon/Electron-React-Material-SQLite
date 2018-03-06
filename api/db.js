const Sequelize = require('sequelize');
const path = require('path');

const sequelize = new Sequelize('CryptoBeast', null, null, {
  dialect: 'sqlite',
  storage: path.join(__dirname, '..', 'DB', 'CryptoBeast.db'),
});

const db = {};

db.todo = sequelize.import(path.join(__dirname, '/models/todo.js'));
db.user = sequelize.import(path.join(__dirname, '/models/user.js'));
db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.todo.belongsTo(db.user);
db.user.hasMany(db.todo);

module.exports = db;

