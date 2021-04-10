const PostRouter = require("express").Router();
const PostController = require("../Controllers/PostController");
const authenticate = require("../middlewares/authentication");

PostRouter.get("/", PostController.getPosts);
PostRouter.get("/post/:postId", PostController.getPost);
PostRouter.get("/my-posts", authenticate, PostController.getUserPosts);

PostRouter.post("/post", authenticate, PostController.createPost);
PostRouter.put("/post/:postId", authenticate, PostController.updatePost);
PostRouter.delete("/post/:postId", authenticate, PostController.deletePost);

module.exports = PostRouter;
