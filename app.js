if (process.env.NODE_ENV !== 'production') { 
    require('dotenv').config(); 
} 

const express = require("express");
const app = express();

const mongoDBConnector = require("./utils/mongoDBConnector.js");
const postsRouter = require("./routes/postRouter.js");

const PORT = process.env.PORT || 3000

app.set('views', __dirname + '/views');
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: false }));
app.use('/static',express.static(__dirname + '/static'));
app.use("/", postsRouter);

app.use(function (req, res, next) {
    res.status(404).send("Not Found")
});

mongoDBConnector();

app.listen(PORT, () => {
    console.log("The application started at port: " + PORT);
})
