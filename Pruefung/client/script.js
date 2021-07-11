"use strict";
var Prüfung;
(function (Prüfung) {
    let url = "https://leonhaasgissose21.herokuapp.com/"; //https://leonhaasgissose21.herokuapp.com/      http://localhost:8100/
    let user = JSON.parse(sessionStorage.getItem("User"));
    let recipeStorage = JSON.parse(sessionStorage.getItem("Recipe"));
    let recipes;
    if (sessionStorage.getItem("User") == undefined) {
        window.location.assign("./index.html");
    }
    switchSites();
    async function switchSites() {
        switch (window.location.pathname) {
            case "/Pruefung/AllRecipes.html":
                recipes = await getRecipes();
                fillSite();
                break;
            case "/Pruefung/viewRecipe.html":
                singleRecipe();
                break;
            case "/Pruefung/MeineRezepte.html":
                recipes = await getRecipes();
                fillSite();
                break;
            case "/Pruefung/MeineFavoriten.html":
                recipes = await getRecipes();
                fillSite();
                break;
        }
    }
    function fillSite() {
        for (let index in recipes) {
            switch (window.location.pathname) {
                case "/Pruefung/AllRecipes.html":
                    createElements(index);
                    break;
                case "/Pruefung/MeineRezepte.html":
                    if (user.recipes.includes(recipes[index]._id)) {
                        createElements(index);
                    }
                    if (user.recipes.length == 0) {
                        alt();
                    }
                    break;
                case "/Pruefung/MeineFavoriten.html":
                    if (user.favorites.includes(recipes[index]._id)) {
                        createElements(index);
                    }
                    break;
            }
        }
    }
    function alt() {
        let addButton = document.getElementById("add");
        addButton.addEventListener("click", addIngr);
        let createRec = document.getElementById("createButton");
        createRec.addEventListener("click", createRecipe);
    }
    function createElements(_index) {
        let index = Number(_index);
        let recipesDiv = document.getElementById("recipes");
        let recipeDiv = document.createElement("div");
        recipeDiv.className = "recipe";
        recipesDiv.appendChild(recipeDiv);
        let title = document.createElement("h1");
        title.innerHTML = recipes[index].title;
        recipeDiv.appendChild(title);
        if (window.location.pathname == "/Pruefung/MeineRezepte.html") {
            let deleteRecipe = document.createElement("button");
            deleteRecipe.id = "deleteRecipe";
            deleteRecipe.innerHTML = "X";
            deleteRecipe.addEventListener("click", function () { deleteThisRecipe(recipes[index]._id); });
            title.appendChild(deleteRecipe);
            let addButton = document.getElementById("add");
            addButton.addEventListener("click", addIngr);
            let createRec = document.getElementById("createButton");
            createRec.addEventListener("click", createRecipe);
        }
        let favBar = document.createElement("button");
        favBar.id = "favIcon";
        if (user.favorites.includes(recipes[index]._id)) {
            favBar.innerHTML = "Favorit entfernen";
            favBar.style.backgroundColor = "palegoldenrod";
        }
        else {
            favBar.innerHTML = "Favorit hinzufügen";
            favBar.style.backgroundColor = "darkgray";
        }
        favBar.addEventListener("click", function () { handleFavorites(recipes[index]._id); });
        recipeDiv.appendChild(favBar);
        let ingDiv = document.createElement("div");
        ingDiv.className = "ingredients";
        let ingredients = document.createElement("ul");
        let ing1 = document.createElement("li");
        let ing2 = document.createElement("li");
        let ing3 = document.createElement("li");
        ing3.id = "moreIng";
        try {
            ing3.innerHTML = "...";
            ing1.innerHTML = recipes[index].ingredients[0];
            ing2.innerHTML = recipes[index].ingredients[1];
        }
        catch (e) {
            console.log(e);
        }
        ingredients.appendChild(ing1);
        ingredients.appendChild(ing2);
        ingredients.appendChild(ing3);
        ingDiv.appendChild(ingredients);
        recipeDiv.appendChild(ingDiv);
        let instrDiv = document.createElement("div");
        instrDiv.className = "instructions";
        let instr = document.createElement("p");
        instr.innerHTML = recipes[index].instructions;
        let instrOverflow = document.createElement("p");
        instrOverflow.id = "instrOver";
        instrOverflow.innerHTML = "...";
        instrDiv.appendChild(instr);
        instrDiv.appendChild(instrOverflow);
        recipeDiv.appendChild(instrDiv);
        let viewRecipe = document.createElement("button");
        viewRecipe.id = "viewRec";
        viewRecipe.innerHTML = "Das ganze Rezept ansehen";
        viewRecipe.addEventListener("click", function () { displayRecipe(recipes[index]._id); });
        recipeDiv.appendChild(viewRecipe);
        let createrName = document.createElement("p");
        createrName.id = "createrName";
        createrName.innerHTML = "Von " + recipes[index].createrName;
        recipeDiv.appendChild(createrName);
    }
    async function createRecipe() {
        let formData = new FormData(document.forms[0]);
        // tslint:disable-next-line: no-any
        let query = new URLSearchParams(formData);
        url = url + "createRecipe" + "?" + query.toString() + "&" + "username=" + user.username;
        let response = await comToServer(url);
        sessionStorage.removeItem("User");
        let responseJSON = await response.text();
        sessionStorage.setItem("User", responseJSON);
    }
    function addIngr() {
        let ingrDiv = document.getElementById("createIngr");
        let ingr = document.createElement("input");
        ingr.setAttribute("type", "text");
        ingr.setAttribute("name", "ingredients");
        ingrDiv.appendChild(ingr);
    }
    function singleRecipe() {
        let recipeDiv = document.getElementById("singleRecipe");
        let title = document.createElement("h1");
        title.innerHTML = recipeStorage.title;
        recipeDiv.appendChild(title);
        let favBar = document.createElement("button");
        favBar.id = "favIcon";
        if (user.favorites.includes(recipeStorage._id)) {
            favBar.innerHTML = "Favorit entfernen";
            favBar.style.backgroundColor = "yellow";
        }
        else {
            favBar.innerHTML = "Favorit hinzufügen";
            favBar.style.backgroundColor = "darkgray";
        }
        favBar.addEventListener("click", function () { handleFavorites(recipeStorage._id); });
        recipeDiv.appendChild(favBar);
        favBar.addEventListener("click", function () { handleFavorites(recipeStorage._id); });
        recipeDiv.appendChild(favBar);
        let ingDiv = document.createElement("div");
        ingDiv.className = "ingredients";
        let ingredients = document.createElement("ul");
        for (let index in recipeStorage.ingredients) {
            let ing = document.createElement("li");
            ing.innerHTML = recipeStorage.ingredients[index];
            ingredients.appendChild(ing);
        }
        ingDiv.appendChild(ingredients);
        recipeDiv.appendChild(ingDiv);
        let instrDiv = document.createElement("div");
        instrDiv.className = "instructions";
        let instr = document.createElement("p");
        instr.innerHTML = recipeStorage.instructions;
        instrDiv.appendChild(instr);
        recipeDiv.appendChild(instrDiv);
        let createrName = document.createElement("p");
        createrName.id = "createrName";
        createrName.innerHTML = "Von " + recipeStorage.createrName;
        recipeDiv.appendChild(createrName);
    }
    async function displayRecipe(_id) {
        let response = await comToServer(url + "getRecipe" + "?" + "_id=" + _id);
        let r = await response.json();
        sessionStorage.setItem("Recipe", JSON.stringify(r));
        window.location.assign("./viewRecipe.html");
    }
    async function deleteThisRecipe(_id) {
        let query = "_id=" + _id + "&" + "username=" + user.username;
        let response = await comToServer(url + "deleteRecipe" + "?" + query.toString());
        sessionStorage.removeItem("User");
        let responseJSON = await response.text();
        sessionStorage.setItem("User", responseJSON);
    }
    async function handleFavorites(_id) {
        let response;
        let query = "_id=" + _id + "&" + "username=" + user.username;
        if (user.favorites.includes(_id)) {
            response = await comToServer(url + "removeFavorite" + "?" + query.toString());
        }
        else {
            response = await comToServer(url + "addFavorite" + "?" + query.toString());
        }
        let responseJSON = await response.text();
        sessionStorage.removeItem("User");
        sessionStorage.setItem("User", responseJSON);
    }
    async function getRecipes() {
        let response = await comToServer(url + "getRecipes");
        let recipes = await response.json();
        return recipes;
    }
    async function comToServer(_url) {
        let response = await fetch(_url);
        return response;
    }
})(Prüfung || (Prüfung = {}));
//# sourceMappingURL=script.js.map