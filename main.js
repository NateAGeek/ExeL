const electron = require('electron');
const url = require('url');
const path = require('path');
const windowManager = require("electron-window-manager");
const app = electron.app;

app.on('ready', function() {
  windowManager.init();
  windowManager.open('main_window', 'Main Window', getAppFile('/index.html'), false, {
  'resizable' : true
  });
});

function getAppFile(file_location) {
  return url.format({
    pathname: path.join(__dirname, file_location),
    protocol: 'file:',
    slashes: true
  });
}

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  //Something here
})

