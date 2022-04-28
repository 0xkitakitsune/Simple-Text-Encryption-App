const ipcRenderer = require("electron").ipcRenderer;

const erasePassword = function(){
    document.querySelector("#password").value = '';
}

const eraseAll = function(){

    document.querySelector("#encryptText").value = '';
    document.querySelector("#decryptText").value = '';
    document.querySelector("#password").value = '';
}

const eraseEncrypt = function(){
    document.querySelector("#encryptText").value = '';
}

const eraseDecrypt = function(){
    document.querySelector("#decryptText").value = '';
}

const encrypt = function(){
    ipcRenderer.send(
        "encrypt",
        document.querySelector("#encryptText").value,
        document.querySelector("#password").value,
    );
}

const decrypt = function(){
    ipcRenderer.send(
        "decrypt",
        document.querySelector("#decryptText").value,
        document.querySelector("#password").value,
    );
}

const copyTextEncrypt = function(){
    var copiedText = document.getElementById("encryptText");
    copiedText.select();
    copiedText.setSelectionRange(0, 99999)
    document.execCommand("copy");
}

const copyTextDecrypt = function(){
    var copiedText = document.getElementById("decryptText");
    copiedText.select();
    copiedText.setSelectionRange(0, 99999)
    document.execCommand("copy");
}

ipcRenderer.on("receiveEncrypted", (event, data) => {
    
    document.querySelector("#decryptText").value = data;

});

ipcRenderer.on("receiveDecrypted", (event, data) => {
    
    document.querySelector("#encryptText").value = data;

});