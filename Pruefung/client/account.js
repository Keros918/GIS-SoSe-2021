"use strict";
var Prüfung;
(function (Prüfung) {
    let url = "https://leonhaasgissose21.herokuapp.com/"; //https://leonhaasgissose21.herokuapp.com/      http://localhost:8100/
    let login = document.getElementById("login");
    let createAcc = document.getElementById("createAcc");
    login.addEventListener("click", function () { waitForResponse("login"); });
    createAcc.addEventListener("click", function () { waitForResponse("create"); });
    async function waitForResponse(_urlPart) {
        let response = await comToServer(url + _urlPart);
        let responseJSON = await response.text();
        if (responseJSON.startsWith("Error")) {
            let responseDiv = document.getElementById("serverMessage");
            let messageText = document.getElementById("serverMessageText");
            responseDiv.style.backgroundColor = "lightcoral";
            messageText.innerText = responseJSON;
        }
        else {
            switch (_urlPart) {
                case "login":
                    waitForResponse("password");
                    break;
                case "create":
                    let responseDiv = document.getElementById("serverMessage");
                    let messageText = document.getElementById("serverMessageText");
                    responseDiv.style.backgroundColor = "darkseagreen";
                    messageText.innerHTML = responseJSON;
                    break;
                case "password":
                    sessionStorage.setItem("User", responseJSON);
                    window.location.assign("./AllRecipes.html");
                    break;
            }
        }
    }
    async function comToServer(_url) {
        let formData = new FormData(document.forms[0]);
        // tslint:disable-next-line: no-any
        let query = new URLSearchParams(formData);
        _url = _url + "?" + query.toString();
        let response = await fetch(_url);
        return response;
    }
})(Prüfung || (Prüfung = {}));
//# sourceMappingURL=account.js.map