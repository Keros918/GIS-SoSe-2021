import * as Http from "http";
import { ParsedUrlQuery } from "querystring";
import * as Url from "url";
import * as Mongo from "mongodb";

export namespace Aufgabe3_4Server {

    interface Student {
        fname: string;
        lname: string;
        matrikel: number;
    }

    let student: Mongo.Collection;

    let port: number = Number(process.env.PORT);
    if (!port)
        port = 8100;

    let dbUrl: string = "mongodb+srv://Keros918:gyf2kCk7obwY1k0g@leonhaas.bwlzq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";  //mongodb://localhost:27017 | mongodb+srv://Keros918:gyf2kCk7obwY1k0g@leonhaas.bwlzq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority

    startServer();

    async function startServer(): Promise<void> {
        console.log("Starting server");

        let server: Http.Server = Http.createServer();
        server.addListener("request", handleRequest);
        server.addListener("listening", handleListen);
        await connectToDB(dbUrl);
        server.listen(port);
    }

    async function connectToDB(_dbUrl: string): Promise<void> {
        let options: Mongo.MongoClientOptions = {useNewUrlParser: true, useUnifiedTopology: true};
        let mongoClient: Mongo.MongoClient = new Mongo.MongoClient(_dbUrl, options);
        await mongoClient.connect();
        student = mongoClient.db("University").collection("Students");
        console.log("Database connection", student != undefined);
    }

    function handleListen(): void {
        console.log("Listening");
    }

    async function handleRequest(_request: Http.IncomingMessage, _response: Http.ServerResponse): Promise<void> {
        console.log("I hear voices!");

        //_response.setHeader("content-type", "text/html; charset=utf-8");
        _response.setHeader("Access-Control-Allow-Origin", "*");

        let parsedUrl: Url.UrlWithParsedQuery = Url.parse(_request.url, true);
        let query: ParsedUrlQuery = parsedUrl.query;

        switch (parsedUrl.pathname) {
            case "/store":
                student.insertOne(query);
                break;
            case "/get":
                let test: Student[] = await student.find().toArray();
                _response.write(JSON.stringify(test));
                break;
        }
        
        _response.end();
    }
}