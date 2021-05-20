"use strict";
var Kapitelaufgabe;
(function (Kapitelaufgabe) {
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
    localStorage.clear();
})(Kapitelaufgabe || (Kapitelaufgabe = {}));
//# sourceMappingURL=result.js.map