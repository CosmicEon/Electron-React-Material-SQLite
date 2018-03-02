### Note: This post is a summary of information paraphrased from an [excellent blog post by Christian Sepulveda](https://medium.freecodecamp.com/building-an-electron-application-with-create-react-app-97945861647c). 

# Prerequisites
* [Create-React-App](https://github.com/facebookincubator/create-react-app)
* [Yarn](https://yarnpkg.com/en/)

# Instructions

Create the app and download the necessary dependencies.

```bash
create-react-app my-app
cd my-app
yarn add electron --dev
yarn add electron-builder --dev
yarn global add foreman # for process management
yarn install
```

Add [electron-quick-start's main.js](https://raw.githubusercontent.com/electron/electron-quick-start/master/main.js) to `src` folder as `electron-starter.js`.

Make the `mainWindow.loadUrl` call look like this instead:

```javascript
// load the index.html of the app.
const startUrl = process.env.ELECTRON_START_URL || url.format({
    pathname: path.join(__dirname, '/../build/index.html'),
    protocol: 'file:',
    slashes: true
});
mainWindow.loadURL(startUrl);
```

Create a file called `electron-wait-react.js` in `src` directory:

```javascript
const net = require('net');
const port = process.env.PORT ? (process.env.PORT - 100) : 3000;

process.env.ELECTRON_START_URL = `http://localhost:${port}`;

const client = new net.Socket();

let startedElectron = false;
const tryConnection = () => client.connect({port: port}, () => {
        client.end();
        if(!startedElectron) {
            console.log('starting electron');
            startedElectron = true;
            const exec = require('child_process').exec;
            exec('npm run electron');
        }
    }
);

tryConnection();

client.on('error', (error) => {
    setTimeout(tryConnection, 1000);
});
```

Ensure that the `name`, `description`, `author`, and `version` fields of your package.json are filled out. Then make the package.json look like this at the bottom: 

```bash
"homepage": "./",
  "main": "src/electron-starter.js",
  "scripts": {
    "start": "nf start -p 3000",
    "build": "react-scripts build",
    "test": "react-scripts test --env=jsdom",
    "eject": "react-scripts eject",
    "electron": "electron .",
    "electron-start": "node src/electron-wait-react",
    "react-start": "react-scripts start",
    "pack": "build --dir",
    "dist": "npm run build && build",
    "postinstall": "install-app-deps"
},
"build": {
    "appId": "com.electron.electron-with-create-react-app",
    "win": {
        "iconUrl": "https://cdn2.iconfinder.com/data/icons/designer-skills/128/react-256.png"
    },
    "directories": {
        "buildResources": "public"
    }
}
```

#### Note: [The electron-builder quick-start instructions can be found here.](https://github.com/electron-userland/electron-builder#quick-setup-guide)

Create a file called `Procfile` in the root folder of the app and put the following code in it:

```bash
react: npm run react-start
electron: npm run electron-start
```

Run using:

```bash
yarn start
```

Build using this command in terminal run as administrator:

```bash
./node_modules/.bin/electron-packager . MyApp --out=dist/osx --platform=darwin --arch=x64

./node_modules/.bin/electron-packager . CryptoBeast --win --x64

```