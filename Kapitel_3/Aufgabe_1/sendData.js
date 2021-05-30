"use strict";
var Aufgabe3_1;
(function (Aufgabe3_1) {
    let submit = document.getElementById("submit");
    submit.addEventListener("click", sendData);
    async function sendData() {
        let url = "http://127.0.0.1:8100";
        let formData = new FormData(document.forms[0]);
        let query = new URLSearchParams(formData);
        url = url + "?" + query.toString();
        console.log(await fetch(url));
    }
})(Aufgabe3_1 || (Aufgabe3_1 = {}));
//# sourceMappingURL=sendData.js.map