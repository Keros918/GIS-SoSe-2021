"use strict";
// Aufgabe 2
// a)
var Aufgabe2;
(function (Aufgabe2) {
    Aufgabe2.heads = [];
    Aufgabe2.bodys = [];
    Aufgabe2.legs = [];
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
                Aufgabe2.heads.push(this);
            }
            else if (this.className == "body") {
                Aufgabe2.bodys.push(this);
            }
            else if (this.className == "leg") {
                Aufgabe2.legs.push(this);
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
    Aufgabe2.heads.push(headOne);
    Aufgabe2.heads.push(headTwo);
    Aufgabe2.heads.push(headThree);
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
        content = Aufgabe2.heads[counter].image;
        show.appendChild(content);
    }
    function showNext() {
        if (counter + 1 == Aufgabe2.heads.length) {
            counter = 0;
        }
        else {
            counter++;
        }
        content.remove();
        showThis();
    }
    function chooseThis() {
        Aufgabe2.pic.head = Aufgabe2.heads[counter];
        console.log(Aufgabe2.pic);
    }
})(Aufgabe2 || (Aufgabe2 = {}));
//# sourceMappingURL=Aufgabe2ff.js.map