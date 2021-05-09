// Aufgabe 2
// a)
namespace Kapitelaufgabe {
    export let heads: Part[] = [];
    export let bodys: Part[] = [];
    export let legs: Part[] = [];

    class Part {
        className: string;
        image: HTMLElement;
        width: string;
        height: string;
        color: string;
    
        constructor(_className: string, _image: HTMLElement) {
            this.className = _className;
            this.image = _image;
            this.width = _image.style.width;
            this.height = _image.style.height;
            this.color = _image.style.color;
            this.addPart();
        }
    
        addPart(): void {
            if (this.className == "head") {
                heads.push(this);
            } else if (this.className == "body") {
                bodys.push(this);
            } else if (this.className == "leg") {
                legs.push(this);
            } else {
                console.error("Error404 \n Classname not found");
            }
        }
    }

    // b)
    export interface Picture {
        head: Part;
        body: Part;
        leg: Part;
    }

    // Aufgabe 3
    // b) & c)
    let c1: HTMLImageElement = document.createElement("img");
    c1.setAttribute("src", "bg.png");

    let headOne: Part = new Part("head", c1);

    let c2: HTMLImageElement = document.createElement("img");
    c2.setAttribute("src", "twitter.png");

    let headTwo: Part = new Part("head", c2);

    let c3: HTMLImageElement = document.createElement("img");
    c3.setAttribute("src", "Instagram.png");

    let headThree: Part = new Part("head", c3);

    heads.push(headOne);
    heads.push(headTwo);
    heads.push(headThree);

    let counter: number = 0;

    let show: HTMLDivElement = document.createElement("div");
    show.id = "show";
    document.body.appendChild(show);

    let next: HTMLElement = document.getElementById("next");
    next.addEventListener("click", showNext);

    let choose: HTMLElement = document.getElementById("this");
    choose.addEventListener("click", chooseThis);

    let content: HTMLElement;

    showThis();

    function showThis(): void {
        content = heads[counter].image;
        show.appendChild(content);
    }

    function showNext(): void {
        if (counter + 1 == heads.length) {
            counter = 0;
        } else {
            counter++;
        }
        content.remove();
        showThis();
    }

    function chooseThis(): void {
        pic.head = heads[counter];
        console.log(pic);
    }
}