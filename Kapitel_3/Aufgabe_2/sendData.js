"use strict";
var Aufgabe3_2;
(function (Aufgabe3_2) {
    let url = "https://leonhaasgissose21.herokuapp.com/"; //https://leonhaasgissose21.herokuapp.com/      http://localhost:8100/
    let submitHTML = document.getElementById("submitHTML");
    submitHTML.addEventListener("click", sendHTML);
    let submitJSON = document.getElementById("submitJSON");
    submitJSON.addEventListener("click", sendJSON);
    async function sendData(_url) {
        let formData = new FormData(document.forms[0]);
        // tslint:disable-next-line: no-any
        let query = new URLSearchParams(formData);
        _url = _url + "?" + query.toString();
        let response = await fetch(_url);
        return response;
    }
    async function sendHTML() {
        let response = await sendData(url + "html");
        let reply = document.getElementById("response");
        reply.innerHTML = await response.text();
    }
    async function sendJSON() {
        let response = await sendData(url + "json");
        let respJSON = await response.json();
        console.log(respJSON);
    }
})(Aufgabe3_2 || (Aufgabe3_2 = {}));
//# sourceMappingURL=sendData.js.map