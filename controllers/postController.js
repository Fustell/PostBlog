const Post = require('../models/postScheme');
const getReadableDate = require('../utils/date')

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
            response.status(501).send("Error 501")
        }
    }
    else{
        response.render("createPost", {
            title: "Створення",
        });
    }
};

async function getAllPosts(request, response){
    try {
        const posts = await Post.find({});
        response.render("allPosts", {posts})
    } catch (error) {
        response.status(501).send("Error 501")
    }
};

async function getPostById (request, response) {
    const id = request.params.id;
    try {
        const post = await  Post.findById(id);
        post.views += 1;

        const updatedViews = await Post.findByIdAndUpdate(id,{views: post.views});
        let date_created = getReadableDate(post.date_created);
        let date_updated = getReadableDate(post.date_updated);
        response.render("SinglePost", {
            post,
            date_created,
            date_updated
        });
    } catch (error) {
        response.status(501).send("Error 501")
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

        if(post != null)
        {
            try {
                const post = await Post.findByIdAndUpdate(id,{title, description, date_updated, isUpdated, author});          
                response.redirect("/posts/post/"+id);
            } catch (error) {
                response.send("Error 501")
            }
        }
    }
    else{
        response.render("editPost", {
            post,
        });
    }
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
        response.status(501).send("Error 501")
    }
}

module.exports = {createPost, getAllPosts, getPostById, updatePost, deletePost};