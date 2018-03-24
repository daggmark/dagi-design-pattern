
const path = {
    viewsPath:__dirname + "/views",
    jsonPath:__dirname + "/model",
    testPath:__dirname + "/tests",
    routesPath:__dirname + "/routes"
};
const config = {
    baseTemplatePath:path.viewsPath + "/base.html",
    addTemplatePath: path.viewsPath + "/add.html",
    editTemplatePath: path.viewsPath + "/edit.html",
    loginTemplatePath: path.viewsPath + "/login.html",
    usersJsonPath: path.jsonPath + "/users.json",
    dictionaryJsonPath: path.jsonPath + "/dictionary.json",
    testFunctionPath:path.testPath + "/testFunctions.js",
    tokenJsonPath:path.jsonPath + "/token.json",
    registerTemplatePath:path.viewsPath+ "/register.html",
    searchTemplatePath:path.viewsPath+ "/search.html",
    adminRouterPath:path.routesPath + "/admin.js",
    authenticateRouterPath:path.routesPath + "/authenticate.js"
};
module.exports = config;