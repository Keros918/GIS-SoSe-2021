namespace Aufgabe3_1 {

    let submit: HTMLElement = document.getElementById("submit");
    submit.addEventListener("click", sendData);

    async function sendData(): Promise<void> {
        let url: string = "https://leonhaasgissose21.herokuapp.com/";
        let formData: FormData = new FormData(document.forms[0]);
        let query: URLSearchParams = new URLSearchParams(<any>formData);
        url = url + "?" + query.toString();
        let response: Response = await fetch(url);
        console.log(response);
    }
}