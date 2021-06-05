namespace Aufgabe3_2 {

    interface JSONResponse {
        fname: string;
        lname: string;
        email: string;
        street: string;
        country: string;
    }

    let url: string = "https://leonhaasgissose21.herokuapp.com/";     //https://leonhaasgissose21.herokuapp.com/      http://localhost:8100/

    let submitHTML: HTMLElement = document.getElementById("submitHTML");
    submitHTML.addEventListener("click", sendHTML);

    let submitJSON: HTMLElement = document.getElementById("submitJSON");
    submitJSON.addEventListener("click", sendJSON);

    async function sendData(_url: string): Promise<Response> {
        let formData: FormData = new FormData(document.forms[0]);
        // tslint:disable-next-line: no-any
        let query: URLSearchParams = new URLSearchParams(<any>formData);
        _url = _url + "?" + query.toString();
        let response: Response = await fetch(_url);
        return response;
    }

    async function sendHTML(): Promise<void> {
        let response: Response = await sendData(url + "html");
        let reply: HTMLElement = document.getElementById("response");
        reply.innerHTML = await response.text();
    }

    async function sendJSON(): Promise<void> {
        let response: Response = await sendData(url + "json");
        let respJSON: JSONResponse = await response.json();
        console.log(respJSON);
    }
}