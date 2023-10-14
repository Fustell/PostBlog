const express = require("express");
const app = express();

const mongoose = require("mongoose");

const postsController = require("./controllers/postController.js");

const PORT = process.env.PORT || 3000;
const URL = "mongodb+srv://roman:12345qwerty@cluster0.2lqtjde.mongodb.net/?retryWrites=true&w=majority";

const postsRouter = express.Router();

postsRouter.use("/create", postsController.createPost);
postsRouter.use("/getAllPosts", postsController.getAllPosts);
postsRouter.use("/post/:id", postsController.getPostById);
postsRouter.use("/edit/:id", postsController.updatePost);
postsRouter.use("/delete/:id", postsController.deletePost);

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));
app.use("/posts", postsRouter);

app.get("/", function (request, response) {
    response.send("Main page");
});

app.use(function (req, res, next) {
    res.status(404).send("Not Found")
});
 
mongoose.connect(URL, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => {
  console.log('Connected to MongoDB');
  // You can put the rest of your code that relies on the connection here
})
.catch((error) => {
  console.error('Error connecting to MongoDB:', error);
});

app.listen(PORT, () => {
    console.log("The application started at port: " + PORT);
})
