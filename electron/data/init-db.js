const Sequelize = require('sequelize');

export const sequelize = new Sequelize('CryptoBeast', null, null, {
    dialect: 'sqlite',
    storage: '../../DB/CryptoBeastDB.db',
    operatorsAliases: false
});

export const User = sequelize.define('user', {
    firstName: {
        type: Sequelize.STRING
    },
    lastName: {
        type: Sequelize.STRING
    }
});

export const initDb = async () => {
    debug('ensureDir')
    await fs.ensureDir(DB_DIR)
    debug('sync')
    await sequelize.sync()
}