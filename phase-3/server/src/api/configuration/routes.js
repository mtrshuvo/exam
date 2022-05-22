const userRouters = require("./../routers/userRouter");
const projectRouter = require("../routers/projectRouter");
const reportRouter = require("../routers/reportRouter");
// const researchRouter = require("../routers/researchRouter");

module.exports = (app) => {
    app.use("/api/users", userRouters);
    app.use("/api/projects", projectRouter);
    app.use("/api/reports", reportRouter);
    // app.use("/api/research", researchRouter);
}