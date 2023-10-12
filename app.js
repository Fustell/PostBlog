const express = require("express");
const app = express();

const userRouter = express.Router();

app.get("/", function (request, response) {
    response.send("Main page");
});

app.use(function (req, res, next) {
    res.status(404).send("Not Found")
});
 
app.listen(3000)