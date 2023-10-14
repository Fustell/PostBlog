const Post = require('../models/postScheme');

async function createPost (request, response){
    if(request.method == 'POST'){
        
        const title = request.body.title;
        const description = request.body.description;
        const author = request.body.author;

        try {
            const post = new Post({title, description, author});
            const savingPost = post.save();
            response.redirect("/posts/getAllPosts");
        } catch (error) {
            response.send("Error 501")
        }
    }
    response.render("create", {
        title: "Створення",
    });
};

async function getAllPosts(request, response){
    try {
        const posts = await Post.find({});
        response.render("allposts", {posts})
    } catch (error) {
        response.send("Error 501")
    }
};

async function getPostById (request, response) {
    const id = request.params.id;
    try {
        const post = await  Post.findById(id);
        post.views += 1;
        const updatedViews = await Post.findByIdAndUpdate(id,{views: post.views});
        response.render("getSinglePost", {
            post,
        });
    } catch (error) {
        response.send("Error 501")
    }
}

async function updatePost(request, response) {
    let id = request.params.id;
    const post = await  Post.findById(id);

    if(request.method == 'POST'){
        
        const title = request.body.title;
        const description = request.body.description;
        const author = request.body.author;
        const date_updated = Date.now();
        const isUpdated = true;

        try {
            const post = await Post.findByIdAndUpdate(id,{title, description, date_updated, isUpdated, author});
            
            response.redirect("/posts/getAllPosts");
        } catch (error) {
            response.send("Error 501")
        }
    }

    response.render("editPost", {
        post,
    });
}

async function deletePost(request, response) {
    const id = request.params.id;
    try {
            const post = await  Post.findByIdAndRemove(id);
        
        
            const posts = await Post.find({});
            response.render("allPosts", {
                posts,
            });
    } catch (error) {
        response.send("Error 501")
    }
}

module.exports = {createPost, getAllPosts, getPostById, updatePost, deletePost};