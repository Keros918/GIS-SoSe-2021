"use strict";
var Aufgabe3_1;
(function (Aufgabe3_1) {
    let submit = document.getElementById("submit");
    submit.addEventListener("click", sendData);
    async function sendData() {
        let url = "https://leonhaasgissose21.herokuapp.com/";
        let formData = new FormData(document.forms[0]);
        let query = new URLSearchParams(formData);
        url = url + "?" + query.toString();
        let response = await fetch(url);
        let reply = document.getElementById("response");
        reply.innerHTML = await response.text();
    }
})(Aufgabe3_1 || (Aufgabe3_1 = {}));
//# sourceMappingURL=sendData.js.map