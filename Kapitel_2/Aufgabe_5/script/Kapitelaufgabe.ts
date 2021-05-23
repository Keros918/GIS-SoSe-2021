namespace Kapitelaufgabe2_5 {

    export interface Part {
        imageSrc: string;
    }

    export interface Parts {
        heads: Part[];
        bodys: Part[];
        legs: Part[];
    }

    export interface Picture {
        head?: Part;
        body?: Part;
        leg?: Part;
    }

    export let partsJSON: string;

    let selected: HTMLDivElement = document.createElement("div");
    selected.id = "chosen";
    document.body.appendChild(selected);

    let show: HTMLDivElement = document.createElement("div");
    show.id = "show";
    document.body.appendChild(show);

    let next: HTMLElement = document.getElementById("next");
    next.addEventListener("click", showNext);

    let choose: HTMLElement = document.getElementById("this");
    choose.addEventListener("click", selectThis);

    let counter: number = 0;

    let content: HTMLElement;

    let parts: Parts;

    // b)
    async function revertJSON(_url: RequestInfo): Promise<void> {
        let response: Response = await fetch(_url);
        partsJSON = await response.json();
        parts = JSON.parse(JSON.stringify(partsJSON));
        selectCurrentPart();
        showThis();
    }

    revertJSON("./script/data.json");

    let pic: Picture = {};

    let storedPic: string = localStorage.getItem("pic");
    if (storedPic) {
        pic = JSON.parse(storedPic);
    }

    let currentParts: Part[] = [];
    let currentPart: string = "";

    function selectCurrentPart(): void {
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

    function showThis(): void {
        content = createImage(currentParts[counter].imageSrc);
        show.appendChild(content);
    }

    if (pic.head) {
        let head: HTMLDivElement = document.createElement("div");
        head.innerText = "Your chosen Head";
        head.appendChild(createImage(pic.head.imageSrc));
        head.setAttribute("id", "head");
        selected.appendChild(head);
    }
    if (pic.body) {
        let body: HTMLDivElement = document.createElement("div");
        body.innerText = "Your chosen Body";
        body.appendChild(createImage(pic.body.imageSrc));
        body.setAttribute("id", "body");
        selected.appendChild(body);
    }

    function showNext(): void {
        if (counter == currentParts.length - 1) {
            counter = 0;
        } else {
            counter++;
        }
        content.remove();
        showThis();
    }

    function createImage(_imageSrc: string): HTMLImageElement {
        let img: HTMLImageElement = document.createElement("img");
        img.src = _imageSrc;
        return img;
    }

    function selectThis(): void {
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
}