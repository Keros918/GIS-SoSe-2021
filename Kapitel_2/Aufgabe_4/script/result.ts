namespace Kapitelaufgabe {
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
}