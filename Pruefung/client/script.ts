namespace Prüfung {

    interface Recipes {
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

    let url: string = "https://leonhaasgissose21.herokuapp.com/";     //https://leonhaasgissose21.herokuapp.com/      http://localhost:8100/

    let user: Users = JSON.parse(sessionStorage.getItem("User"));
    let recipeStorage: Recipes = JSON.parse(sessionStorage.getItem("Recipe"));
    let recipes: Recipes[];

    if (sessionStorage.getItem("User") == undefined) {
        window.location.assign("./index.html");
    }
    console.log(window.location.pathname);
    console.log("test");
    switchSites();

    async function switchSites(): Promise<void> {
        switch (window.location.pathname) {
            case "/GIS-SoSe-2021/Pruefung/AllRecipes.html":
                recipes = await getRecipes();
                fillSite();
                break;
            case "/GIS-SoSe-2021/Pruefung/viewRecipe.html":
                singleRecipe();
                break;
            case "/GIS-SoSe-2021/Pruefung/MeineRezepte.html":
                recipes = await getRecipes();
                fillSite();
                break;
            case "/GIS-SoSe-2021/Pruefung/MeineFavoriten.html":
                recipes = await getRecipes();
                fillSite();
                break;
        }
    }

    function fillSite(): void {
        for (let index in recipes) {
            switch (window.location.pathname) {
                case "/GIS-SoSe-2021/Pruefung/AllRecipes.html":
                    createElements(index);
                    break;
                case "/GIS-SoSe-2021/Pruefung/MeineRezepte.html":
                    if (user.recipes.includes(recipes[index]._id)) {
                        createElements(index);
                    }
                    if (user.recipes.length == 0) {
                        alt();
                    }
                    break;
                case "/GIS-SoSe-2021/Pruefung/MeineFavoriten.html":
                    if (user.favorites.includes(recipes[index]._id)) {
                        createElements(index);
                    }
                    break;
            }
        }
    }

    function alt(): void {
        let addButton: HTMLElement = document.getElementById("add");
        addButton.addEventListener("click", addIngr);

        let createRec: HTMLElement = document.getElementById("createButton");
        createRec.addEventListener("click", createRecipe);
    }

    function createElements(_index: string): void {
        let index: number = Number(_index);
        let recipesDiv: HTMLElement = document.getElementById("recipes");
        let recipeDiv: HTMLElement = document.createElement("div");
        recipeDiv.className = "recipe";
        recipesDiv.appendChild(recipeDiv);

        let title: HTMLElement = document.createElement("h1");
        title.innerHTML = recipes[index].title;
        recipeDiv.appendChild(title);

        if (window.location.pathname == "/GIS-SoSe-2021/Pruefung/MeineRezepte.html") {
            let deleteRecipe: HTMLElement = document.createElement("button");
            deleteRecipe.id = "deleteRecipe";
            deleteRecipe.innerHTML = "X";
            deleteRecipe.addEventListener("click", function (): void { deleteThisRecipe(recipes[index]._id); });
            title.appendChild(deleteRecipe);

            let addButton: HTMLElement = document.getElementById("add");
            addButton.addEventListener("click", addIngr);

            let createRec: HTMLElement = document.getElementById("createButton");
            createRec.addEventListener("click", createRecipe);
        }

        let favBar: HTMLElement = document.createElement("button");
        favBar.id = "favIcon";
        if (user.favorites.includes(recipes[index]._id)) {
            favBar.innerHTML = "Favorit entfernen";
            favBar.style.backgroundColor = "palegoldenrod";
        } else {
            favBar.innerHTML = "Favorit hinzufügen";
            favBar.style.backgroundColor = "darkgray";
        }
        favBar.addEventListener("click", function (): void { handleFavorites(recipes[index]._id); });
        recipeDiv.appendChild(favBar);

        let ingDiv: HTMLElement = document.createElement("div");
        ingDiv.className = "ingredients";
        let ingredients: HTMLElement = document.createElement("ul");
        let ing1: HTMLElement = document.createElement("li");
        let ing2: HTMLElement = document.createElement("li");
        let ing3: HTMLElement = document.createElement("li");
        ing3.id = "moreIng";
        try {
            ing3.innerHTML = "...";
            ing1.innerHTML = recipes[index].ingredients[0];
            ing2.innerHTML = recipes[index].ingredients[1];
        } catch (e) {
            console.log(e);
        }
        ingredients.appendChild(ing1);
        ingredients.appendChild(ing2);
        ingredients.appendChild(ing3);
        ingDiv.appendChild(ingredients);
        recipeDiv.appendChild(ingDiv);

        let instrDiv: HTMLElement = document.createElement("div");
        instrDiv.className = "instructions";
        let instr: HTMLElement = document.createElement("p");
        instr.innerHTML = recipes[index].instructions;
        let instrOverflow: HTMLElement = document.createElement("p");
        instrOverflow.id = "instrOver";
        instrOverflow.innerHTML = "...";
        instrDiv.appendChild(instr);
        instrDiv.appendChild(instrOverflow);
        recipeDiv.appendChild(instrDiv);

        let viewRecipe: HTMLElement = document.createElement("button");
        viewRecipe.id = "viewRec";
        viewRecipe.innerHTML = "Das ganze Rezept ansehen";
        viewRecipe.addEventListener("click", function (): void { displayRecipe(recipes[index]._id); });
        recipeDiv.appendChild(viewRecipe);

        let createrName: HTMLElement = document.createElement("p");
        createrName.id = "createrName";
        createrName.innerHTML = "Von " + recipes[index].createrName;
        recipeDiv.appendChild(createrName);
    }

    async function createRecipe(): Promise<void> {
        let formData: FormData = new FormData(document.forms[0]);
        // tslint:disable-next-line: no-any
        let query: URLSearchParams = new URLSearchParams(<any>formData);
        url = url + "createRecipe" + "?" + query.toString() + "&" + "username=" + user.username;
        let response: Response = await comToServer(url);
        sessionStorage.removeItem("User");
        let responseJSON: string = await response.text();
        sessionStorage.setItem("User", responseJSON);
    }

    function addIngr(): void {
        let ingrDiv: HTMLElement = document.getElementById("createIngr");
        let ingr: HTMLElement = document.createElement("input");

        ingr.setAttribute("type", "text");
        ingr.setAttribute("name", "ingredients");
        ingrDiv.appendChild(ingr);
    }

    function singleRecipe(): void {
        let recipeDiv: HTMLElement = document.getElementById("singleRecipe");

        let title: HTMLElement = document.createElement("h1");
        title.innerHTML = recipeStorage.title;
        recipeDiv.appendChild(title);

        let favBar: HTMLElement = document.createElement("button");
        favBar.id = "favIcon";
        if (user.favorites.includes(recipeStorage._id)) {
            favBar.innerHTML = "Favorit entfernen";
            favBar.style.backgroundColor = "yellow";
        } else {
            favBar.innerHTML = "Favorit hinzufügen";
            favBar.style.backgroundColor = "darkgray";
        }
        favBar.addEventListener("click", function (): void { handleFavorites(recipeStorage._id); });
        recipeDiv.appendChild(favBar);

        favBar.addEventListener("click", function (): void { handleFavorites(recipeStorage._id); });
        recipeDiv.appendChild(favBar);

        let ingDiv: HTMLElement = document.createElement("div");
        ingDiv.className = "ingredients";
        let ingredients: HTMLElement = document.createElement("ul");
        for (let index in recipeStorage.ingredients) {
            let ing: HTMLElement = document.createElement("li");
            ing.innerHTML = recipeStorage.ingredients[index];
            ingredients.appendChild(ing);
        }
        ingDiv.appendChild(ingredients);
        recipeDiv.appendChild(ingDiv);

        let instrDiv: HTMLElement = document.createElement("div");
        instrDiv.className = "instructions";
        let instr: HTMLElement = document.createElement("p");
        instr.innerHTML = recipeStorage.instructions;
        instrDiv.appendChild(instr);
        recipeDiv.appendChild(instrDiv);

        let createrName: HTMLElement = document.createElement("p");
        createrName.id = "createrName";
        createrName.innerHTML = "Von " + recipeStorage.createrName;
        recipeDiv.appendChild(createrName);
    }

    async function displayRecipe(_id: string): Promise<void> {
        let response: Response = await comToServer(url + "getRecipe" + "?" + "_id=" + _id);
        let r: Recipes = await response.json();
        sessionStorage.setItem("Recipe", JSON.stringify(r));
        window.location.assign("./viewRecipe.html");
    }

    async function deleteThisRecipe(_id: string): Promise<void> {
        let query: string = "_id=" + _id + "&" + "username=" + user.username;
        let response: Response = await comToServer(url + "deleteRecipe" + "?" + query.toString());
        sessionStorage.removeItem("User");
        let responseJSON: string = await response.text();
        sessionStorage.setItem("User", responseJSON);
    }

    async function handleFavorites(_id: string): Promise<void> {
        let response: Response;
        let query: string = "_id=" + _id + "&" + "username=" + user.username;
        if (user.favorites.includes(_id)) {
            response = await comToServer(url + "removeFavorite" + "?" + query.toString());
        } else {
            response = await comToServer(url + "addFavorite" + "?" + query.toString());
        }
        let responseJSON: string = await response.text();
        sessionStorage.removeItem("User");
        sessionStorage.setItem("User", responseJSON);
    }

    async function getRecipes(): Promise<Recipes[]> {
        let response: Response = await comToServer(url + "getRecipes");
        let recipes: Recipes[] = await response.json();
        return recipes;
    }

    async function comToServer(_url: string): Promise<Response> {
        let response: Response = await fetch(_url);
        return response;
    }
}