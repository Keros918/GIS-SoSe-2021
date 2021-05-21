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
    localStorage.clear();
})(Kapitelaufgabe2_5 || (Kapitelaufgabe2_5 = {}));
//# sourceMappingURL=result.js.map