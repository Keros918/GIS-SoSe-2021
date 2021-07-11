import * as Http from "http";
import { ParsedUrlQuery } from "querystring";
import * as Url from "url";
import * as Mongo from "mongodb";

export namespace PrüfungServer {

    interface BuildReqest {
        username?: string;
        password?: string;
        favorites?: string[];
        recipes?: string[];
        _id?: string;
        title?: string;
        createrName?: string;
        ingredients?: string[];
        instructions?: string;
    }

    interface Users {
        username?: string;
        password?: string;
        favorites?: string[];
        recipes?: string[];
    }

    interface Recipes {
        _id?: string;
        title?: string;
        createrName?: string;
        ingredients?: string[];
        instructions?: string;
    }

    let recipeDB: Mongo.Collection;
    let userDB: Mongo.Collection;

    let user: Users;
    let userFromDB: Users[];
    let recipe: Recipes;
    let recipeFromDB: Recipes[];

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
        let options: Mongo.MongoClientOptions = { useNewUrlParser: true, useUnifiedTopology: true };
        let mongoClient: Mongo.MongoClient = new Mongo.MongoClient(_dbUrl, options);
        await mongoClient.connect();
        recipeDB = mongoClient.db("RecipeApp").collection("Recipes");
        userDB = mongoClient.db("RecipeApp").collection("Users");
        console.log("Database connection", recipeDB != undefined);
        console.log("Database connection", userDB != undefined);
    }

    function handleListen(): void {
        console.log("Listening");
    }

    async function handleRequest(_request: Http.IncomingMessage, _response: Http.ServerResponse): Promise<void> {
        console.log("I hear voices!");

        _response.setHeader("Access-Control-Allow-Origin", "*");

        let parsedUrl: Url.UrlWithParsedQuery = Url.parse(_request.url, true);
        let query: ParsedUrlQuery = parsedUrl.query;

        let buildRequest: BuildReqest = JSON.parse(JSON.stringify(query));

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
        let s: Mongo.ObjectId = new Mongo.ObjectId(recipe._id);
        recipeFromDB = await recipeDB.find({ _id: s }).toArray();

        switch (parsedUrl.pathname) {
            case "/login":
                try {
                    if (userFromDB[0].username) {
                        _response.write("Benutzername gefunden");
                    }
                } catch (exception) {
                    _response.write("Error: Benutzername nicht gefunden!");
                }
                break;
            case "/create":
                try {
                    if (userFromDB[0].username) {
                        _response.write("Error: Nutzername existiert bereits! Versuchen sie einen anderen!");
                    }
                } catch (e) {
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
                } else {
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
                await userDB.updateOne(
                    {username: user.username},
                    { $push: { favorites: recipe._id}}       
                );
                userFromDB = await userDB.find({ username: user.username }).toArray();
                _response.write(JSON.stringify(userFromDB[0]));
                break;
            case "/removeFavorite":
                await userDB.updateOne(
                    {username: user.username},
                    { $pull: { favorites: recipe._id}}       
                );
                userFromDB = await userDB.find({ username: user.username }).toArray();
                _response.write(JSON.stringify(userFromDB[0]));
                break;
            case "/getRecipe":
                _response.write(JSON.stringify(recipeFromDB[0]));
                break;
            case "/deleteRecipe":
                recipeDB.findOneAndDelete({ _id: recipeFromDB[0]._id });
                await userDB.updateOne(
                    {username: user.username},
                    { $pull: { recipes: recipe._id}}       
                );
                userDB.updateMany(
                    {},
                    { $pull: { favorites: recipe._id } }
                );
                userFromDB = await userDB.find({ username: user.username }).toArray();
                _response.write(JSON.stringify(userFromDB[0]));
                break;
            case "/createRecipe":
                let newRecipe: Recipes = {
                    title: recipe.title,
                    createrName: user.username,
                    ingredients: recipe.ingredients,
                    instructions: recipe.instructions
                };
                let id: string = (await recipeDB.insertOne(newRecipe)).insertedId;
                await userDB.updateOne(
                    {username: user.username},
                    { $push: { recipes: id.toString()}}       
                );
                userFromDB = await userDB.find({ username: user.username }).toArray();
                _response.write(JSON.stringify(userFromDB[0]));
                break;
        }
        _response.end();
    }

    async function getRecipes(): Promise<Recipes[]> {
        let recipes: Recipes[] = await recipeDB.find().toArray();
        return recipes;
    }

    async function loadFavorites(_query: ParsedUrlQuery): Promise<Users[]> {
        let username: Users = JSON.parse(JSON.stringify(_query));
        let favoriteIDs: Users[] = await userDB.find({ username: username.username }, { projection: { _id: 0, favorites: 1 } }).toArray();
        return favoriteIDs;
    }
}