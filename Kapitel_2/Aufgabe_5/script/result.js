"use strict";
var Kapitelaufgabe2_5;
(function (Kapitelaufgabe2_5) {
    let pic = {};
    let storedPic = localStorage.getItem("pic");
    if (storedPic) {
        pic = JSON.parse(storedPic);
    }
    let result = document.getElementById("finalePicture");
    result.appendChild(createImage(pic.head.imageSrc));
    result.appendChild(createImage(pic.body.imageSrc));
    result.appendChild(createImage(pic.leg.imageSrc));
    function createImage(_imageSrc) {
        let img = document.createElement("img");
        img.src = _imageSrc;
        return img;
    }
    // c)
    let serverRespo;
    async function sendTo(_url) {
        let query = new URLSearchParams(JSON.parse(localStorage.getItem("pic")));
        _url = _url + "?" + query.toString();
        serverRespo = await (await fetch(_url)).json();
    }
    function serverResponse() {
        let respArea = document.getElementById("ServerResponse");
        if (serverRespo.error == undefined) {
            respArea.innerHTML = serverRespo.message;
            respArea.style.backgroundColor = "green";
        }
        if (serverRespo.message == undefined) {
            respArea.innerHTML = serverRespo.error;
            respArea.style.backgroundColor = "red";
        }
    }
    waitForServer();
    async function waitForServer() {
        await sendTo("https://gis-communication.herokuapp.com");
        serverResponse();
        localStorage.clear();
    }
})(Kapitelaufgabe2_5 || (Kapitelaufgabe2_5 = {}));
//# sourceMappingURL=result.js.map