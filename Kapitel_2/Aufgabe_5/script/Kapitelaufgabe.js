"use strict";
var Kapitelaufgabe2_5;
(function (Kapitelaufgabe2_5) {
    let selected = document.createElement("div");
    selected.id = "chosen";
    document.body.appendChild(selected);
    let show = document.createElement("div");
    show.id = "show";
    document.body.appendChild(show);
    let next = document.getElementById("next");
    next.addEventListener("click", showNext);
    let choose = document.getElementById("this");
    choose.addEventListener("click", selectThis);
    let counter = 0;
    let content;
    let parts;
    // b)
    async function revertJSON(_url) {
        let response = await fetch(_url);
        Kapitelaufgabe2_5.partsJSON = await response.json();
        parts = JSON.parse(JSON.stringify(Kapitelaufgabe2_5.partsJSON));
        selectCurrentPart();
        showThis();
    }
    revertJSON("./script/data.json");
    let pic = {};
    let storedPic = localStorage.getItem("pic");
    if (storedPic) {
        pic = JSON.parse(storedPic);
    }
    let currentParts = [];
    let currentPart = "";
    function selectCurrentPart() {
        switch (document.title) {
            case "Choose Head":
                currentPart = "head";
                currentParts = parts.heads;
                break;
            case "Choose Body":
                currentPart = "body";
                currentParts = parts.bodys;
                break;
            case "Choose Leg":
                currentPart = "leg";
                currentParts = parts.legs;
                break;
        }
    }
    function showThis() {
        content = createImage(currentParts[counter].imageSrc);
        show.appendChild(content);
    }
    if (pic.head) {
        let head = document.createElement("div");
        head.innerText = "Your chosen Head";
        head.appendChild(createImage(pic.head.imageSrc));
        head.setAttribute("id", "head");
        selected.appendChild(head);
    }
    if (pic.body) {
        let body = document.createElement("div");
        body.innerText = "Your chosen Body";
        body.appendChild(createImage(pic.body.imageSrc));
        body.setAttribute("id", "body");
        selected.appendChild(body);
    }
    function showNext() {
        if (counter == currentParts.length - 1) {
            counter = 0;
        }
        else {
            counter++;
        }
        content.remove();
        showThis();
    }
    function createImage(_imageSrc) {
        let img = document.createElement("img");
        img.src = _imageSrc;
        return img;
    }
    function selectThis() {
        switch (currentPart) {
            case "head":
                pic.head = currentParts[counter];
                break;
            case "body":
                pic.body = currentParts[counter];
                break;
            case "leg":
                pic.leg = currentParts[counter];
                break;
        }
        localStorage.setItem("pic", JSON.stringify(pic));
        switch (currentPart) {
            case "head":
                window.location.assign("./chooseBody.html");
                break;
            case "body":
                window.location.assign("./chooseLeg.html");
                break;
            case "leg":
                window.location.assign("./finale_picture.html");
                break;
        }
    }
})(Kapitelaufgabe2_5 || (Kapitelaufgabe2_5 = {}));
//# sourceMappingURL=Kapitelaufgabe.js.map