const electron = require('electron');
const url = require('url');
const path = require('path');

const { app, BrowserWindow } = electron;
require('electron-reload')(__dirname, {
    electron: path.join(__dirname, 'node_modules', '.bin', 'electron.cmd')
})

let mainWindow;

// Listen for app to be ready
app.on('ready', function(){

    // Create new window
    mainWindow = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true
        }
    });

    // Load html into window
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'src + ui/index.html'),
        protocol:'file:',
        slashes: true
    }));




//    mainWindow.loadFile('src + ui/index.html')

// mainWindow.webContents.openDevTools()
//
//    let menu = Menu.buildFromTemplate([
//        {
//           label: 'File',
//               submenu:[
//                {label:'Get Article'},
//                {label:'Exit',
//                click() {
//                    app.quit()
//                }
//
//                }
//           ]
//        }
//    ])
//    Menu.setApplicationMenu(menu)
})
