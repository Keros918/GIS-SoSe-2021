namespace Kapitelaufgabe {

    export let heads: Part[] = [];
    export let bodys: Part[] = [];
    export let legs: Part[] = [];

    class Part {
        className: string;
        image: HTMLElement;
        imagesrc: string;
        width: string;
        height: string;
        color: string;
    
        constructor(_className: string, _image: HTMLElement) {
            this.className = _className;
            this.image = _image;
            this.imagesrc = _image.getAttribute("src");
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

    export interface Picture {
        head: Part;
        body: Part;
        leg: Part;
    }

    let c1: HTMLImageElement = document.createElement("img");
    c1.setAttribute("src", "AmsterdamZoo.jpg");

    let headOne: Part = new Part("head", c1);

    let c2: HTMLImageElement = document.createElement("img");
    c2.setAttribute("src", "Schwarzwald1.jpg");

    let headTwo: Part = new Part("head", c2);

    let c3: HTMLImageElement = document.createElement("img");
    c3.setAttribute("src", "Schwarzwald2.jpg");

    let headThree: Part = new Part("head", c3);

    bodys.push(headOne);
    bodys.push(headTwo);
    bodys.push(headThree);

    legs.push(headOne);
    legs.push(headTwo);
    legs.push(headThree);

    let counter: number = 0;

    let chosen: HTMLDivElement = document.createElement("div");
    chosen.id = "chosen";
    document.body.appendChild(chosen);

    let show: HTMLDivElement = document.createElement("div");
    show.id = "show";
    document.body.appendChild(show);

    let next: HTMLElement = document.getElementById("next");
    next.addEventListener("click", showNext);

    let choose: HTMLElement = document.getElementById("this");
    choose.addEventListener("click", chooseThis);

    let content: HTMLElement;  
    let picture: Picture;

    showThis();

    if ((window.location.href == "http://127.0.0.1:5500/Kapitel_2/Aufgabe_4/chooseBody.html")
     || (window.location.href == "http://127.0.0.1:5500/Kapitel_2/Aufgabe_4/chooseLeg.html")) {
        loadThis();
        let textHead: HTMLElement = document.createElement("div");
        textHead.innerText = "Your chosen Head.";
        textHead.appendChild(picture.head.image);
        chosen.appendChild(textHead);
        if (window.location.href == "http://127.0.0.1:5500/Kapitel_2/Aufgabe_4/chooseLeg.html") {
            textHead.style.float = "left";
            let textBody: HTMLElement = document.createElement("div");
            textBody.innerText = "Your chosen Body";
            textBody.style.float = "right";
            textBody.appendChild(picture.body.image);
            chosen.appendChild(textBody);
        }
    }

    function showThis(): void {
        if (window.location.href == "http://127.0.0.1:5500/Kapitel_2/Aufgabe_4/chooseHead.html") {
            content = heads[counter].image;
            show.appendChild(content);
        } else if (window.location.href == "http://127.0.0.1:5500/Kapitel_2/Aufgabe_4/chooseBody.html") {
            content = bodys[counter].image;
            show.appendChild(content);
        } else if (window.location.href == "http://127.0.0.1:5500/Kapitel_2/Aufgabe_4/chooseLeg.html") {
            content = legs[counter].image;
            show.appendChild(content);
        } else if (window.location.href == "http://127.0.0.1:5500/Kapitel_2/Aufgabe_4/finale_picture.html") {
            loadThis();
            show.appendChild(picture.head.image);
            show.appendChild(picture.body.image);
            show.appendChild(picture.leg.image);
        }
    }

    function showNext(): void {
        if (window.location.href == "http://127.0.0.1:5500/Kapitel_2/Aufgabe_4/chooseHead.html") {
            if (counter + 1 == heads.length) {
                counter = 0;
            } else {
                counter++;
            }
        } else if (window.location.href == "http://127.0.0.1:5500/Kapitel_2/Aufgabe_4/chooseBody.html") {
            if (counter + 1 == bodys.length) {
                counter = 0;
            } else {
                counter++;
            }
        } else if (window.location.href == "http://127.0.0.1:5500/Kapitel_2/Aufgabe_4/chooseLeg.html") {
            if (counter + 1 == legs.length) {
                counter = 0;
            } else {
                counter++;
            }
        }
        content.remove();
        showThis();
    }

    function chooseThis(): void {
        if (window.location.href == "http://127.0.0.1:5500/Kapitel_2/Aufgabe_4/chooseHead.html") {
            pic.head = heads[counter];
            saveThis();
            window.location.href = "chooseBody.html";
        } else if (window.location.href == "http://127.0.0.1:5500/Kapitel_2/Aufgabe_4/chooseBody.html") {
            pic.head = picture.head;
            pic.body = bodys[counter];
            saveThis();
            window.location.href = "chooseLeg.html";
        } else if (window.location.href == "http://127.0.0.1:5500/Kapitel_2/Aufgabe_4/chooseLeg.html") {
            pic.head = picture.head;
            pic.body = picture.body;
            pic.leg = legs[counter];
            saveThis();
            window.location.href = "finale_picture.html";
        }
    }

    function revertJSON(): void {
        picture = JSON.parse(picJSON);
        let newHead: HTMLImageElement = document.createElement("img");
        newHead.setAttribute("src", picture.head.imagesrc);
        picture.head.image = newHead;
        if ((window.location.href == "http://127.0.0.1:5500/Kapitel_2/Aufgabe_4/chooseLeg.html") || 
        (window.location.href == "http://127.0.0.1:5500/Kapitel_2/Aufgabe_4/finale_picture.html")) {
            let newBody: HTMLImageElement = document.createElement("img");
            newBody.setAttribute("src", picture.body.imagesrc);
            picture.body.image = newBody;
        }
        if (window.location.href == "http://127.0.0.1:5500/Kapitel_2/Aufgabe_4/finale_picture.html") {
            let newLeg: HTMLImageElement = document.createElement("img");
            newLeg.setAttribute("src", picture.leg.imagesrc);
            picture.leg.image = newLeg;
        }
    }

    function saveThis(): void {
        picJSON = JSON.stringify(pic);
        localStorage.setItem("Picture", picJSON);
    }

    function loadThis(): void {
        picJSON = localStorage.getItem("Picture");
        revertJSON();
    }
}