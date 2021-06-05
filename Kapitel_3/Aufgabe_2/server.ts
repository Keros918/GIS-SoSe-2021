import * as Http from "http";
import { ParsedUrlQuery } from "querystring";
import * as Url from "url";

export namespace P_3_2Server {
    console.log("Starting server");
    let port: number = Number(process.env.PORT);
    if (!port)
        port = 8100;

    let server: Http.Server = Http.createServer();
    server.addListener("request", handleRequest);
    server.addListener("listening", handleListen);
    server.listen(port);

    function handleListen(): void {
        console.log("Listening");
    }

    function handleRequest(_request: Http.IncomingMessage, _response: Http.ServerResponse): void {
        console.log("I hear voices!");

        let parsedUrl: Url.UrlWithParsedQuery = Url.parse(_request.url, true);
        let query: ParsedUrlQuery = parsedUrl.query;
        _response.setHeader("Access-Control-Allow-Origin", "*");

        switch (parsedUrl.pathname) {
            case "/html":
                _response.setHeader("content-type", "text/html; charset=utf-8");
                for (let key in query) {
                    _response.write("<br/>" + key + ": " + query[key]);
                }
                break;
            case "/json":
                _response.setHeader("content-type", "application/json");
                _response.write(JSON.stringify(query));
                break;
        }
        _response.end();
    }
}