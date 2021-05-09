"use strict";
// Aufgabe 2
// a)
var Kapitelaufgabe;
(function (Kapitelaufgabe) {
    Kapitelaufgabe.heads = [];
    Kapitelaufgabe.bodys = [];
    Kapitelaufgabe.legs = [];
    class Part {
        constructor(_className, _image) {
            this.className = _className;
            this.image = _image;
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
    // Aufgabe 3
    // b) & c)
    let c1 = document.createElement("img");
    c1.setAttribute("src", "bg.png");
    let headOne = new Part("head", c1);
    let c2 = document.createElement("img");
    c2.setAttribute("src", "twitter.png");
    let headTwo = new Part("head", c2);
    let c3 = document.createElement("img");
    c3.setAttribute("src", "Instagram.png");
    let headThree = new Part("head", c3);
    Kapitelaufgabe.heads.push(headOne);
    Kapitelaufgabe.heads.push(headTwo);
    Kapitelaufgabe.heads.push(headThree);
    let counter = 0;
    let show = document.createElement("div");
    show.id = "show";
    document.body.appendChild(show);
    let next = document.getElementById("next");
    next.addEventListener("click", showNext);
    let choose = document.getElementById("this");
    choose.addEventListener("click", chooseThis);
    let content;
    showThis();
    function showThis() {
        content = Kapitelaufgabe.heads[counter].image;
        show.appendChild(content);
    }
    function showNext() {
        if (counter + 1 == Kapitelaufgabe.heads.length) {
            counter = 0;
        }
        else {
            counter++;
        }
        content.remove();
        showThis();
    }
    function chooseThis() {
        Kapitelaufgabe.pic.head = Kapitelaufgabe.heads[counter];
        console.log(Kapitelaufgabe.pic);
    }
})(Kapitelaufgabe || (Kapitelaufgabe = {}));
//# sourceMappingURL=Aufgabe2ff.js.map