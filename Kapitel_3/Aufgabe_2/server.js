"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.P_3_2Server = void 0;
const Http = require("http");
const Url = require("url");
var P_3_2Server;
(function (P_3_2Server) {
    console.log("Starting server");
    let port = Number(process.env.PORT);
    if (!port)
        port = 8100;
    let server = Http.createServer();
    server.addListener("request", handleRequest);
    server.addListener("listening", handleListen);
    server.listen(port);
    function handleListen() {
        console.log("Listening");
    }
    function handleRequest(_request, _response) {
        console.log("I hear voices!");
        let parsedUrl = Url.parse(_request.url, true);
        let query = parsedUrl.query;
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
})(P_3_2Server = exports.P_3_2Server || (exports.P_3_2Server = {}));
//# sourceMappingURL=server.js.map