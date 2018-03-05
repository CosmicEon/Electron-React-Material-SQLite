# Electron, React with Material-UI design theme and SQLite with Sequelize


## Setup the project
Problem goes with the package `sqlite3`, which is native and need to be rebuild to be used with electron

* Install those packages
``` bash
npm install –g node-gyp
```
``` bash
npm install -g windows-build-tools # This package needs to be run from administrator console, also python is required
```

* Run this command to rebuild `sqlite3`
``` bash
npm run rebuild
```
If there are no errors, the project can be started


## Commands to use
* To start the project:
``` bash
npm start
```

* To use the Electron debug tool
execute the following from the Console tab of your running Electron app's developer tools:
``` javascript
require('devtron').install();
```

You should then see a Devtron tab added.


## Documentations
* React - Front-end
    - [repository description](./documentation/react.md)

* Material-UI Design - Template for React
    - [repository description](./documentation/react.md)
    - [tutorial](https://creativetimofficial.github.io/material-dashboard-react/#/documentation/tutorial)
    - [live demo](https://creativetimofficial.github.io/material-dashboard-react/#/dashboard)

* Electron - 'Back-end'
    - [repository description](./documentation/electron.md)

* SQLite3 - file based SQL
    - [repository description](./documentation/sqlite3.md)

* Sequelize - ORM
    - [repository description](./documentation/sequelize.md)

