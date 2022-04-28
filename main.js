
const { app, BrowserWindow, ipcMain } = require("electron");

const CryptoJS  = require('crypto-js');

let win = null;

function createWindow () {
    win = new BrowserWindow({
      width: 800,
      height: 620,
      resizable: true,
      webPreferences: {
        nodeIntegration: true,
        contextIsolation: false,
      },
    })
  
    win.loadFile('index.html')
    win.setMenu(null);
}

app.whenReady().then(() => {
    createWindow()
})

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') app.quit()
});

ipcMain.on("encrypt", (event, data, password) => {

    const encrypted = CryptoJS.AES.encrypt(data, password);

    win.webContents.send("receiveEncrypted", encrypted.toString())
    
});

ipcMain.on("decrypt", (event, data, password) => {

    const decryptedFromText = CryptoJS.AES.decrypt(data, password);

    win.webContents.send("receiveDecrypted", decryptedFromText.toString(CryptoJS.enc.Utf8))
    
});

