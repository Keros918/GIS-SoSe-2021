namespace Aufgabe3_4 {

    interface JSONResponse {
        fname: string;
        lname: string;
        matrikelnummer: number;
    }

    let url: string = "https://leonhaasgissose21.herokuapp.com/";     //https://leonhaasgissose21.herokuapp.com/      http://localhost:8100/

    let submit: HTMLElement = document.getElementById("submit");
    submit.addEventListener("click", sendForm);

    let get: HTMLElement = document.getElementById("get");
    get.addEventListener("click", getData);

    async function getData(): Promise<void> {
        let response: Response = await communicate(url + "get");
        let showResp: JSONResponse = await response.json();
        let respDIV: HTMLElement = document.getElementById("ServerResponse");
        respDIV.innerHTML = JSON.stringify(showResp);
    }

    async function sendForm(): Promise<void> {
        let response: Response = await communicate(url + "store");
        console.log(response);
    }

    async function communicate(_url: string): Promise<Response> {
        let formData: FormData = new FormData(document.forms[0]);
        // tslint:disable-next-line: no-any
        let query: URLSearchParams = new URLSearchParams(<any>formData);
        _url = _url + "?" + query.toString();
        let response: Response = await fetch(_url);
        return response;
    }
}