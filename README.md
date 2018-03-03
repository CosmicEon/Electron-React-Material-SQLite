# React with Matirial-UI design theme, Electron and SQLite with Sequelize


## Startup the project
Problem goes with the pacakge `sqlite3`, wich is native and need to be prebuild to be used with electron

* Install those packages
``` bash
npm install –g node-gyp
```
``` bash
npm install -g windows-build-tools # This package needs to be run from administrator console, also need python installed
```

* Run this command to rebuild `sqlite3`
``` bash
npm run rebuild-sqlite3
```

* After all is done, project starts with:
``` bash
npm start
```


## Documentations
* React - [repository](./documentation/react.md)
* Material-UI Design
    * [repository](./documentation/react.md)
    * [tutorial](https://creativetimofficial.github.io/material-dashboard-react/#/documentation/tutorial)
    * [live demo](https://creativetimofficial.github.io/material-dashboard-react/#/dashboard)
* Electron  - [repository](./documentation/electron.md)
* Sequelize
    * [repository](./documentation/sequelize.md)
    * full documentation in sequelize folder
