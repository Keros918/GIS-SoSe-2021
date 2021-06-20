"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Aufgabe3_4Server = void 0;
const Http = require("http");
const Url = require("url");
const Mongo = require("mongodb");
var Aufgabe3_4Server;
(function (Aufgabe3_4Server) {
    let student;
    let port = Number(process.env.PORT);
    if (!port)
        port = 8100;
    let dbUrl = "mongodb+srv://Keros918:gyf2kCk7obwY1k0g@leonhaas.bwlzq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"; //mongodb://localhost:27017 | mongodb+srv://Keros918:gyf2kCk7obwY1k0g@leonhaas.bwlzq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
    startServer();
    async function startServer() {
        console.log("Starting server");
        let server = Http.createServer();
        server.addListener("request", handleRequest);
        server.addListener("listening", handleListen);
        await connectToDB(dbUrl);
        server.listen(port);
    }
    async function connectToDB(_dbUrl) {
        let options = { useNewUrlParser: true, useUnifiedTopology: true };
        let mongoClient = new Mongo.MongoClient(_dbUrl, options);
        await mongoClient.connect();
        student = mongoClient.db("University").collection("Students");
        console.log("Database connection", student != undefined);
    }
    function handleListen() {
        console.log("Listening");
    }
    async function handleRequest(_request, _response) {
        console.log("I hear voices!");
        //_response.setHeader("content-type", "text/html; charset=utf-8");
        _response.setHeader("Access-Control-Allow-Origin", "*");
        let parsedUrl = Url.parse(_request.url, true);
        let query = parsedUrl.query;
        switch (parsedUrl.pathname) {
            case "/store":
                student.insertOne(query);
                break;
            case "/get":
                let test = await student.find().toArray();
                _response.write(JSON.stringify(test));
                break;
        }
        _response.end();
    }
})(Aufgabe3_4Server = exports.Aufgabe3_4Server || (exports.Aufgabe3_4Server = {}));
//# sourceMappingURL=server.js.map