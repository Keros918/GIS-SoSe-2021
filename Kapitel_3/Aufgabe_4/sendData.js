"use strict";
var Aufgabe3_4;
(function (Aufgabe3_4) {
    let url = "https://leonhaasgissose21.herokuapp.com/"; //https://leonhaasgissose21.herokuapp.com/      http://localhost:8100/
    let submit = document.getElementById("submit");
    submit.addEventListener("click", sendForm);
    let get = document.getElementById("get");
    get.addEventListener("click", getData);
    async function getData() {
        let response = await communicate(url + "get");
        let showResp = await response.json();
        let respDIV = document.getElementById("ServerResponse");
        respDIV.innerHTML = JSON.stringify(showResp);
    }
    async function sendForm() {
        let response = await communicate(url + "store");
        console.log(response);
    }
    async function communicate(_url) {
        let formData = new FormData(document.forms[0]);
        // tslint:disable-next-line: no-any
        let query = new URLSearchParams(formData);
        _url = _url + "?" + query.toString();
        let response = await fetch(_url);
        return response;
    }
})(Aufgabe3_4 || (Aufgabe3_4 = {}));
//# sourceMappingURL=sendData.js.map