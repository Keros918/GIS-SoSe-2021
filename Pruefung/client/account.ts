namespace Prüfung {

    let url: string = "//https://leonhaasgissose21.herokuapp.com/";     //https://leonhaasgissose21.herokuapp.com/      http://localhost:8100/

    let login: HTMLElement = document.getElementById("login");
    let createAcc: HTMLElement = document.getElementById("createAcc");

    login.addEventListener("click", function(): void {waitForResponse("login"); });
    createAcc.addEventListener("click", function(): void {waitForResponse("create"); });

    async function waitForResponse(_urlPart: string): Promise<void> {
        let response: Response = await comToServer(url + _urlPart);
        let responseJSON: string = await response.text();
        if (responseJSON.startsWith("Error")) {
            let responseDiv: HTMLElement = document.getElementById("serverMessage");
            let messageText: HTMLElement = document.getElementById("serverMessageText");
            responseDiv.style.backgroundColor = "lightcoral";
            messageText.innerText = responseJSON;
        } else {
            switch (_urlPart) {
                case "login":
                    waitForResponse("password");
                    break;
                case "create":
                    let responseDiv: HTMLElement = document.getElementById("serverMessage");
                    let messageText: HTMLElement = document.getElementById("serverMessageText");
                    responseDiv.style.backgroundColor = "darkseagreen";
                    messageText.innerHTML = responseJSON;
                    break;
                case "password":
                    sessionStorage.setItem("User", responseJSON);
                    window.location.assign("./AllRecipes.html");
                    break;          
            }
        }
    }

    async function comToServer(_url: string): Promise<Response> {
        let formData: FormData = new FormData(document.forms[0]);
        // tslint:disable-next-line: no-any
        let query: URLSearchParams = new URLSearchParams(<any>formData);
        _url = _url + "?" + query.toString();
        let response: Response = await fetch(_url);
        return response;
    }
}