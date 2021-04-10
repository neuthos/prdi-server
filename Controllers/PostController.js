const Post = require("../Models/Post");
const User = require("../Models/User");

class PostController {
  static async getPosts(req, res) {
    try {
      const posts = await Post.find({}).populate("comments").populate("user");

      res.status(200).json({ posts });
    } catch (err) {
      res.status(404).json({ err });
    }
  }

  static async getUserPosts(req, res) {
    try {
      const { _id } = req.dataUser;

      const posts = await User.find({ _id }).populate("posts");

      res.status(200).json({ data: posts });
    } catch (err) {
      console.log(err);
      res.status(404).json({ err });
    }
  }

  static async getPost(req, res) {
    try {
      const { postId } = req.params;

      const post = await Post.find({ _id: postId })
        .populate("comments")
        .populate("user");

      res.status(200).json({ post });
    } catch (err) {
      res.status(404).json({ err });
    }
  }

  static async createPost(req, res) {
    try {
      let { title, description } = req.body;
      const userId = req.dataUser;
      const user = await User.findOne({ _id: userId });

      const newPost = new Post({
        title,
        description,
        user,
      });

      await newPost.save();
      await User.findByIdAndUpdate(
        user._id,
        { posts: [...user.posts, newPost] },
        { new: true, useFindAndModify: false }
      );

      res.status(201).json(newPost);
    } catch (err) {
      let message = [];

      if (err.errors.title) {
        message.push(err.errors.title.message);
      }
      if (err.errors.description) {
        message.push(err.errors.description.message);
      }

      res.status(400).json({ error: message });
    }
  }

  static async updatePost(req, res) {
    try {
      let { title, description } = req.body;
      const postId = req.params.postId;
      const updatedPost = {
        title,
        description,
      };

      await Post.findByIdAndUpdate(postId, updatedPost, {
        new: true,
        useFindAndModify: false,
      });
      res.status(200).json({ message: "Post updated" });
    } catch (err) {
      let message = [];

      if (err.errors.title) {
        message.push(err.errors.title.message);
      }
      if (err.errors.description) {
        message.push(err.errors.description.message);
      }

      res.status(400).json({ error: message });
    }
  }

  static async deletePost(req, res) {
    try {
      const postId = req.params.postId;

      const deletePost = await Post.findByIdAndDelete(postId);

      if (!deletePost) res.status(404).json({ message: "No post found" });
      res.status(200).json({ message: "Post deleted" });
    } catch (err) {
      res.status(500).json({ err });
    }
  }
}

module.exports = PostController;
