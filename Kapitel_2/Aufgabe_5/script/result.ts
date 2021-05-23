namespace Kapitelaufgabe2_5 {

    // Interface für c)
    interface Respo {
        error?: string;
        message?: string;
    }

    let pic: Picture = {};
    let storedPic: string = localStorage.getItem("pic");
    if (storedPic) {
        pic = JSON.parse(storedPic);
    }

    let result: HTMLDivElement = <HTMLDivElement>document.getElementById("finalePicture");

    result.appendChild(createImage(pic.head.imageSrc));
    result.appendChild(createImage(pic.body.imageSrc));
    result.appendChild(createImage(pic.leg.imageSrc));

    function createImage(_imageSrc: string): HTMLImageElement {
        let img: HTMLImageElement = document.createElement("img");
        img.src = _imageSrc;
        return img;
    }

    // c)
    let serverRespo: Respo;

    async function sendTo(_url: RequestInfo): Promise<void> {
        let query: URLSearchParams = new URLSearchParams(JSON.parse(localStorage.getItem("pic")));
        _url = _url + "?" + query.toString();
        serverRespo = await (await fetch(_url)).json();
    }

    function serverResponse(): void {
        let respArea: HTMLElement = document.getElementById("ServerResponse");
        if (serverRespo.error == undefined) {
            respArea.innerHTML = serverRespo.message;
            respArea.style.backgroundColor = "green";
        }
        if (serverRespo.message == undefined) {
            respArea.innerHTML = serverRespo.error;
            respArea.style.backgroundColor = "red";
        }
    }

    waitForServer();

    async function waitForServer(): Promise<void> {
        await sendTo("https://gis-communication.herokuapp.com");
        serverResponse();
        localStorage.clear();
  }
}