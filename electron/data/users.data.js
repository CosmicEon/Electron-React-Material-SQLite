const { User } = require('./init-db');

export const findAllUsers = async () => {
    return new Promise((resolve, reject) => {
        // force: true will drop the table if it already exists
        User.sync({ force: true })
            .then(() => {
                // Table created
                return User.create({
                    firstName: 'John',
                    lastName: 'Hancock'
                });
            });

        const result = await User.findAll()
            .then(users => {
                console.log(users)
                // mainWindow.webContents.send("db-result", users);
            })

        return resolve(result);
    })
}

module.exports = { findAllUsers }