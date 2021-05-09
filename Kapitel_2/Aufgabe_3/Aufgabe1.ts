namespace Aufgabe3 {
    // Aufgabe 1
    class Rechteck {
        rechteck: HTMLDivElement;
        random: number;
        posX: number;
        posY: number;
        width: number;
        height: number;
        classname: string;

        constructor(_classname: string) {
            this.rechteck = document.createElement("div");
            this.random = Math.random() * 10;
            this.posX = this.random * 150;
            this.posY = this.random * 60;
            this.width = Math.random() * 200;
            this.height = Math.random() * 200;
            this.classname = _classname;
        }

        buildRect(): void {
            this.rechteck.style.position = "absolute";
            this.rechteck.style.width = this.width + "px";
            this.rechteck.style.height = this.height + "px";
            this.rechteck.style.top = this.posY + "px";
            this.rechteck.style.left = this.posX + "px";
            this.rechteck.style.borderStyle = "solid";
            this.rechteck.className = this.classname;
            document.body.appendChild(this.rechteck);
        }
    }

    let anzahl: number = Math.random() * 10;
    anzahl = Math.round(anzahl);
    let rectangles: Rechteck[] = [];
    while (anzahl > 0) {
        rectangles.push(new Rechteck("rect"));
        rectangles[rectangles.length - 1].buildRect();
        anzahl--;
    }

    let addRect: HTMLButtonElement = document.createElement("button");
    let reset: HTMLButtonElement = document.createElement("button");
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

    let build: HTMLAnchorElement = document.createElement("a");
    build.style.backgroundColor = "lightgray";
    build.innerText = "Build your own Picture";
    build.setAttribute("href", "chooseHead.html");
    build.style.padding = "20px";
    build.style.marginLeft = "20px";
    document.body.appendChild(build);

    function handleRect(): void {
        let rect: Rechteck = new Rechteck("rectNeu");
        rect.buildRect();
    }

    function handleReset(): void {
        let remove: HTMLCollection = document.getElementsByClassName("rectNeu");
        while (remove.length > 0) {
            remove.item(0).remove();
        }
    }
}