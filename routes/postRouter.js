const express = require("express")
const postsRouter = express.Router();
const postsController = require("../controllers/postController")

postsRouter.use("/create", postsController.createPost);
postsRouter.use("/post/:id", postsController.getPostById);
postsRouter.use("/edit/:id", postsController.updatePost);
postsRouter.use("/delete/:id", postsController.deletePost);
postsRouter.use("/", postsController.getAllPosts);

module.exports = postsRouter;