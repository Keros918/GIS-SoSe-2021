"use strict";
var Kapitelaufgabe;
(function (Kapitelaufgabe) {
    Kapitelaufgabe.heads = [];
    Kapitelaufgabe.bodys = [];
    Kapitelaufgabe.legs = [];
    class Part {
        constructor(_className, _image) {
            this.className = _className;
            this.image = _image;
            this.imagesrc = _image.getAttribute("src");
            this.width = _image.style.width;
            this.height = _image.style.height;
            this.color = _image.style.color;
            this.addPart();
        }
        addPart() {
            if (this.className == "head") {
                Kapitelaufgabe.heads.push(this);
            }
            else if (this.className == "body") {
                Kapitelaufgabe.bodys.push(this);
            }
            else if (this.className == "leg") {
                Kapitelaufgabe.legs.push(this);
            }
            else {
                console.error("Error404 \n Classname not found");
            }
        }
    }
    let c1 = document.createElement("img");
    c1.setAttribute("src", "AmsterdamZoo.jpg");
    let headOne = new Part("head", c1);
    let c2 = document.createElement("img");
    c2.setAttribute("src", "Schwarzwald1.jpg");
    let headTwo = new Part("head", c2);
    let c3 = document.createElement("img");
    c3.setAttribute("src", "Schwarzwald2.jpg");
    let headThree = new Part("head", c3);
    Kapitelaufgabe.bodys.push(headOne);
    Kapitelaufgabe.bodys.push(headTwo);
    Kapitelaufgabe.bodys.push(headThree);
    Kapitelaufgabe.legs.push(headOne);
    Kapitelaufgabe.legs.push(headTwo);
    Kapitelaufgabe.legs.push(headThree);
    let counter = 0;
    let chosen = document.createElement("div");
    chosen.id = "chosen";
    document.body.appendChild(chosen);
    let show = document.createElement("div");
    show.id = "show";
    document.body.appendChild(show);
    let next = document.getElementById("next");
    next.addEventListener("click", showNext);
    let choose = document.getElementById("this");
    choose.addEventListener("click", chooseThis);
    let content;
    let picture;
    showThis();
    if ((window.location.href == "https://keros918.github.io/GIS-SoSe-2021/Kapitel_2/Aufgabe_4/chooseBody.html")
        || (window.location.href == "https://keros918.github.io/GIS-SoSe-2021/Kapitel_2/Aufgabe_4/chooseLeg.html")) {
        loadThis();
        let textHead = document.createElement("div");
        textHead.innerText = "Your chosen Head.";
        textHead.appendChild(picture.head.image);
        chosen.appendChild(textHead);
        if (window.location.href == "https://keros918.github.io/GIS-SoSe-2021/Kapitel_2/Aufgabe_4/chooseLeg.html") {
            textHead.style.float = "left";
            let textBody = document.createElement("div");
            textBody.innerText = "Your chosen Body";
            textBody.style.float = "right";
            textBody.appendChild(picture.body.image);
            chosen.appendChild(textBody);
        }
    }
    function showThis() {
        if (window.location.href == "https://keros918.github.io/GIS-SoSe-2021/Kapitel_2/Aufgabe_4/chooseHead.html") {
            content = Kapitelaufgabe.heads[counter].image;
            show.appendChild(content);
        }
        else if (window.location.href == "https://keros918.github.io/GIS-SoSe-2021/Kapitel_2/Aufgabe_4/chooseBody.html") {
            content = Kapitelaufgabe.bodys[counter].image;
            show.appendChild(content);
        }
        else if (window.location.href == "https://keros918.github.io/GIS-SoSe-2021/Kapitel_2/Aufgabe_4/chooseLeg.html") {
            content = Kapitelaufgabe.legs[counter].image;
            show.appendChild(content);
        }
        else if (window.location.href == "https://keros918.github.io/GIS-SoSe-2021/Kapitel_2/Aufgabe_4/finale_picture.html") {
            loadThis();
            show.appendChild(picture.head.image);
            show.appendChild(picture.body.image);
            show.appendChild(picture.leg.image);
        }
    }
    function showNext() {
        if (window.location.href == "https://keros918.github.io/GIS-SoSe-2021/Kapitel_2/Aufgabe_4/chooseHead.html") {
            if (counter + 1 == Kapitelaufgabe.heads.length) {
                counter = 0;
            }
            else {
                counter++;
            }
        }
        else if (window.location.href == "https://keros918.github.io/GIS-SoSe-2021/Kapitel_2/Aufgabe_4/chooseBody.html") {
            if (counter + 1 == Kapitelaufgabe.bodys.length) {
                counter = 0;
            }
            else {
                counter++;
            }
        }
        else if (window.location.href == "https://keros918.github.io/GIS-SoSe-2021/Kapitel_2/Aufgabe_4/chooseLeg.html") {
            if (counter + 1 == Kapitelaufgabe.legs.length) {
                counter = 0;
            }
            else {
                counter++;
            }
        }
        content.remove();
        showThis();
    }
    function chooseThis() {
        if (window.location.href == "https://keros918.github.io/GIS-SoSe-2021/Kapitel_2/Aufgabe_4/chooseHead.html") {
            Kapitelaufgabe.pic.head = Kapitelaufgabe.heads[counter];
            saveThis();
            window.location.href = "chooseBody.html";
        }
        else if (window.location.href == "https://keros918.github.io/GIS-SoSe-2021/Kapitel_2/Aufgabe_4/chooseBody.html") {
            Kapitelaufgabe.pic.head = picture.head;
            Kapitelaufgabe.pic.body = Kapitelaufgabe.bodys[counter];
            saveThis();
            window.location.href = "chooseLeg.html";
        }
        else if (window.location.href == "https://keros918.github.io/GIS-SoSe-2021/Kapitel_2/Aufgabe_4/chooseLeg.html") {
            Kapitelaufgabe.pic.head = picture.head;
            Kapitelaufgabe.pic.body = picture.body;
            Kapitelaufgabe.pic.leg = Kapitelaufgabe.legs[counter];
            saveThis();
            window.location.href = "finale_picture.html";
        }
    }
    function revertJSON() {
        picture = JSON.parse(Kapitelaufgabe.picJSON);
        let newHead = document.createElement("img");
        newHead.setAttribute("src", picture.head.imagesrc);
        picture.head.image = newHead;
        if ((window.location.href == "https://keros918.github.io/GIS-SoSe-2021/Kapitel_2/Aufgabe_4/chooseLeg.html") ||
            (window.location.href == "https://keros918.github.io/GIS-SoSe-2021/Kapitel_2/Aufgabe_4/finale_picture.html")) {
            let newBody = document.createElement("img");
            newBody.setAttribute("src", picture.body.imagesrc);
            picture.body.image = newBody;
        }
        if (window.location.href == "https://keros918.github.io/GIS-SoSe-2021/Kapitel_2/Aufgabe_4/finale_picture.html") {
            let newLeg = document.createElement("img");
            newLeg.setAttribute("src", picture.leg.imagesrc);
            picture.leg.image = newLeg;
        }
    }
    function saveThis() {
        Kapitelaufgabe.picJSON = JSON.stringify(Kapitelaufgabe.pic);
        localStorage.setItem("Picture", Kapitelaufgabe.picJSON);
    }
    function loadThis() {
        Kapitelaufgabe.picJSON = localStorage.getItem("Picture");
        revertJSON();
    }
})(Kapitelaufgabe || (Kapitelaufgabe = {}));
//# sourceMappingURL=Kapitelaufgabe.js.map