"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.P_3_1Server = void 0;
const Http = require("http");
var P_3_1Server;
(function (P_3_1Server) {
    console.log("Starting server"); // In der Konsole wird "Starting Server ausgegeben"
    let port = Number(process.env.PORT); // Eine Vaiable vom Typ number wird festgelegt. In ihr wird der Port gespeichert.
    if (!port) // Falls noch kein Port festgelegt ist, wird er hier auf 8100 gesetzt.
        port = 8100;
    let server = Http.createServer(); // Eine variable vom Typ Http.Server wird erstellt um mit dem Server kommunizieren zu können
    server.addListener("request", handleRequest); // Dem Server wird ein Listener hinzugefügt. Sobald an den Server eine Request Anfrage geschickt wird, wird die Funktion handleRequest aufgerufen
    server.addListener("listening", handleListen); // Dem Server wird ein Listener hinzugefügt. Sobald an den Server eine Listening Anfrage geschickt wird, wird die Funktion handleListen aufgerufen
    server.listen(port); // Der Server soll auf den festgelegten port hören
    function handleListen() {
        console.log("Listening"); // "Listening" wird in der Konsole ausgegeben
    }
    //https://leonhaasgissose21.herokuapp.com/
    function handleRequest(_request, _response) {
        console.log("I hear voices!"); // "I hear voices!" wird in der Konsole ausgegeben
        _response.setHeader("content-type", "text/html; charset=utf-8"); // Der Header vom ServerResponse mit dem Name "content-type" wird festgelegt
        _response.setHeader("Access-Control-Allow-Origin", "*"); // Der Header vom ServerResponse mit dem Name "Access-Control-Allow-Origin" wird festgelegt
        _response.write(_request.url); // Der Query/Path string wird auf der Seite angezeigt
        console.log(_request.url);
        _response.end(); // Sendet gepufferte Ausgaben an den Client und beendet die Ausführung der Seite
    }
})(P_3_1Server = exports.P_3_1Server || (exports.P_3_1Server = {}));
//# sourceMappingURL=script.js.map