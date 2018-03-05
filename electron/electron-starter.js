const { app, BrowserWindow, ipcMain } = require('electron');
// Module to control application life.
// const app = electron.app

const productController = require('./product/controller');
const requester = require('./requester');

// Module to create native browser window.
// const BrowserWindow = electron.BrowserWindow

const path = require('path');
const url = require('url');

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({ width: 1400, height: 800 });

  // load the index.html of the app.
  const startUrl = process.env.ELECTRON_START_URL || url.format({
    pathname: path.join(__dirname, '/../build/index.html'),
    protocol: 'file:',
    slashes: true,
  });
  mainWindow.loadURL(startUrl);

  // Open the DevTools.
  mainWindow.webContents.openDevTools();

  // Test DB GET
  ipcMain.on('getProductsCall', (event, args) => {
    console.log(event);

    // handle the request
    productController.getProducts()
      .then((results) => {
        mainWindow.webContents.send('getProductsReturn', JSON.stringify(results));
      });
  });

  // Test DB POST
  ipcMain.on('addToProductsCall', (event, args) => {
    console.log(event);
    const itemToAdd = args;

    // handle the request
    productController.addToProducts(itemToAdd)
      .then(() => {
        // test HTTP.GET and return result to react
        // const location = requester.getLocation();
        mainWindow.webContents.send('addToProductsReturn', 'success');
      });
  });

  // Test HTTP GET to Google Maps
  ipcMain.on('getLocationCall', (event) => {
    console.log(event);

    // handle the request
    requester.getLocation()
      .then((result) => {
        // test HTTP.GET and return result to react
        mainWindow.webContents.send('getLocationReturn', result);
      });
  });

  mainWindow.webContents.on('crashed', (error) => { console.log(error); });

  // Emitted when the window is closed.
  mainWindow.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

app.on('unresponsive', (error) => { console.log(error); });

app.on('uncaughtException', (error) => { console.log(error); });

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
