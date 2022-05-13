const PostDashboardRouter = require("express").Router()

PostDashboardRouter.route("/create")
    .post(require("./create.js"))
    .get(require("./create.view.js"))

PostDashboardRouter.route("/:slug")
    .get(require("./view.js"))

module.exports = PostDashboardRouter