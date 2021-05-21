"use strict";
var Aufgabe3;
(function (Aufgabe3) {
    // Aufgabe 1
    class Rechteck {
        constructor(_classname) {
            this.rechteck = document.createElement("div");
            this.random = Math.random() * 10;
            this.posX = this.random * 150;
            this.posY = this.random * 60;
            this.width = Math.random() * 200;
            this.height = Math.random() * 200;
            this.classname = _classname;
        }
        buildRect() {
            this.rechteck.style.position = "absolute";
            this.rechteck.style.width = this.width + "px";
            this.rechteck.style.height = this.height + "px";
            this.rechteck.style.top = this.posY + "px";
            this.rechteck.style.left = this.posX + "px";
            this.rechteck.style.borderStyle = "solid";
            this.rechteck.className = this.classname;
            this.rechteck.style.zIndex = "-1";
            document.body.appendChild(this.rechteck);
        }
    }
    let anzahl = Math.random() * 10;
    anzahl = Math.round(anzahl);
    let rectangles = [];
    while (anzahl > 0) {
        rectangles.push(new Rechteck("rect"));
        rectangles[rectangles.length - 1].buildRect();
        anzahl--;
    }
    let addRect = document.createElement("button");
    let reset = document.createElement("button");
    addRect.style.width = "100px";
    addRect.style.height = "50px";
    reset.style.width = "100px";
    reset.style.height = "50px";
    addRect.innerText = "add Rect";
    reset.innerText = "Reset";
    document.body.appendChild(addRect);
    document.body.appendChild(reset);
    addRect.addEventListener("click", handleRect);
    reset.addEventListener("click", handleReset);
    let build = document.createElement("a");
    build.style.backgroundColor = "lightgray";
    build.innerText = "Build your own Picture";
    build.setAttribute("href", "chooseHead.html");
    build.style.padding = "20px";
    build.style.marginLeft = "20px";
    document.body.appendChild(build);
    function handleRect() {
        let rect = new Rechteck("rectNeu");
        rect.buildRect();
    }
    function handleReset() {
        let remove = document.getElementsByClassName("rectNeu");
        while (remove.length > 0) {
            remove.item(0).remove();
        }
    }
})(Aufgabe3 || (Aufgabe3 = {}));
//# sourceMappingURL=Aufgabe1.js.map