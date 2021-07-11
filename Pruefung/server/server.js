"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrüfungServer = void 0;
const Http = require("http");
const Url = require("url");
const Mongo = require("mongodb");
var PrüfungServer;
(function (PrüfungServer) {
    let recipeDB;
    let userDB;
    let user;
    let userFromDB;
    let recipe;
    let recipeFromDB;
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
        recipeDB = mongoClient.db("RecipeApp").collection("Recipes");
        userDB = mongoClient.db("RecipeApp").collection("Users");
        console.log("Database connection", recipeDB != undefined);
        console.log("Database connection", userDB != undefined);
    }
    function handleListen() {
        console.log("Listening");
    }
    async function handleRequest(_request, _response) {
        console.log("I hear voices!");
        _response.setHeader("Access-Control-Allow-Origin", "*");
        let parsedUrl = Url.parse(_request.url, true);
        let query = parsedUrl.query;
        let buildRequest = JSON.parse(JSON.stringify(query));
        user = {
            username: buildRequest.username,
            password: buildRequest.password,
            favorites: buildRequest.favorites,
            recipes: buildRequest.recipes
        };
        userFromDB = await userDB.find({ username: user.username }).toArray();
        recipe = {
            _id: buildRequest._id,
            title: buildRequest.title,
            createrName: buildRequest.createrName,
            ingredients: buildRequest.ingredients,
            instructions: buildRequest.instructions
        };
        let s = new Mongo.ObjectId(recipe._id);
        recipeFromDB = await recipeDB.find({ _id: s }).toArray();
        switch (parsedUrl.pathname) {
            case "/login":
                try {
                    if (userFromDB[0].username) {
                        _response.write("Benutzername gefunden");
                    }
                }
                catch (exception) {
                    _response.write("Error: Benutzername nicht gefunden!");
                }
                break;
            case "/create":
                try {
                    if (userFromDB[0].username) {
                        _response.write("Error: Nutzername existiert bereits! Versuchen sie einen anderen!");
                    }
                }
                catch (e) {
                    await userDB.insertOne({
                        username: user.username,
                        password: user.password,
                        favorites: [],
                        recipes: []
                    });
                    _response.write("Der Account wurde erfolgreich erstellt!");
                }
                break;
            case "/password":
                if (userFromDB[0].password == user.password) {
                    _response.write(JSON.stringify(userFromDB[0]));
                }
                else {
                    _response.write("Error: Passwort stimmt nicht überein!");
                }
                break;
            case "/getRecipes":
                _response.write(JSON.stringify(await getRecipes()));
                break;
            case "/loadFavorites":
                _response.write(JSON.stringify(await loadFavorites(query)));
                break;
            case "/addFavorite":
                await userDB.updateOne({ username: user.username }, { $push: { favorites: recipe._id } });
                userFromDB = await userDB.find({ username: user.username }).toArray();
                _response.write(JSON.stringify(userFromDB[0]));
                break;
            case "/removeFavorite":
                await userDB.updateOne({ username: user.username }, { $pull: { favorites: recipe._id } });
                userFromDB = await userDB.find({ username: user.username }).toArray();
                _response.write(JSON.stringify(userFromDB[0]));
                break;
            case "/getRecipe":
                _response.write(JSON.stringify(recipeFromDB[0]));
                break;
            case "/deleteRecipe":
                recipeDB.findOneAndDelete({ _id: recipeFromDB[0]._id });
                await userDB.updateOne({ username: user.username }, { $pull: { recipes: recipe._id } });
                userDB.updateMany({}, { $pull: { favorites: recipe._id } });
                userFromDB = await userDB.find({ username: user.username }).toArray();
                _response.write(JSON.stringify(userFromDB[0]));
                break;
            case "/createRecipe":
                let newRecipe = {
                    title: recipe.title,
                    createrName: user.username,
                    ingredients: recipe.ingredients,
                    instructions: recipe.instructions
                };
                let id = (await recipeDB.insertOne(newRecipe)).insertedId;
                await userDB.updateOne({ username: user.username }, { $push: { recipes: id.toString() } });
                userFromDB = await userDB.find({ username: user.username }).toArray();
                _response.write(JSON.stringify(userFromDB[0]));
                break;
        }
        _response.end();
    }
    async function getRecipes() {
        let recipes = await recipeDB.find().toArray();
        return recipes;
    }
    async function loadFavorites(_query) {
        let username = JSON.parse(JSON.stringify(_query));
        let favoriteIDs = await userDB.find({ username: username.username }, { projection: { _id: 0, favorites: 1 } }).toArray();
        return favoriteIDs;
    }
})(PrüfungServer = exports.PrüfungServer || (exports.PrüfungServer = {}));
//# sourceMappingURL=server.js.map