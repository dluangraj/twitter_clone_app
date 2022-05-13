const MainAuthRouter = require("express").Router()

MainAuthRouter.route("/login")
    .get(require("./auth/login.view.js"))
    .post(require(("./auth/login.js")))

MainAuthRouter.route("/register")
    .get(require("./auth/register.view.js"))
    .post(require(("./auth/register.js")))

MainAuthRouter.route("/logout")
    .get(require(("./auth/logout.js")))

module.exports = { function(MainAuthRouter, app) {
    app.use("/auth", require("./index.js"))
    /*  
    app.use("/quiz", require("./quiz"))
    app.use("/", require("./dashboard")) 
    */
}
}