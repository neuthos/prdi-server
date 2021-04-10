const User = require("../Models/User");
const Post = require("../Models/Post");
const Comment = require("../Models/Comment");

class CommentController {
  static async createComment(req, res, next) {
    try {
      let { text } = req.body;
      let { username } = req.dataUser;
      const postId = req.params.postId;

      const post = await Post.findOne({ _id: postId });

      const newComment = new Comment({
        name: username,
        text,
        post,
        reply: [],
      });

      await newComment.save();
      await Post.findByIdAndUpdate(
        post._id,
        {
          comments: [...post.comments, newComment],
        },
        { new: true, useFindAndModify: false }
      );

      res.status(201).json(newComment);
    } catch (err) {
      let message = [];

      if (err.errors.text) {
        message.push(err.errors.text.message);
      }

      res.status(400).json({ error: message });
    }
  }

  static async replyComment(req, res, next) {
    try {
      let { text } = req.body;
      let { username } = req.dataUser;
      let commentId = req.params.commentId;

      const comment = await Comment.findOne({ _id: commentId });

      const newReply = new Comment({
        name: username,
        text,
        reply: [],
      });

      await newReply.save();

      await Comment.findByIdAndUpdate(
        comment._id,
        { reply: [...comment.reply, newReply] },
        { new: true, useFindAndModify: false }
      );

      res.status(201).json(newReply);
    } catch (err) {
      let message = [];

      if (err.errors.text) {
        message.push(err.errors.text.message);
      }

      res.status(400).json({ error: message });
    }
  }

  static async getComment(req, res, next) {
    try {
      let commentId = req.params.commentId;

      const comment = await Comment.find({ _id: commentId }).populate("reply");

      res.status(200).json({ comment });
    } catch (err) {
      res.status(404).json({ error: "Comment not found" });
    }
  }

  static async updateComment(req, res, next) {
    try {
      let { text } = req.body;
      const commentId = req.params.commentId;
      const updateComment = {
        text,
      };

      await Comment.findByIdAndUpdate(commentId, updateComment, {
        useFindAndModify: false,
      });

      res.status(200).json({ message: "Comment updated" });
    } catch (err) {
      let message = [];

      if (err.errors.text) {
        message.push(err.errors.text.message);
      }

      res.status(400).json({ error: message });
    }
  }

  static async deleteComment(req, res, next) {
    try {
      const commentId = req.params.commentId;

      const deleteComment = await Comment.findByIdAndDelete(commentId);

      if (!deleteComment) res.status(404).json({ message: "No comment found" });
      res.status(200).json({ message: "Comment deleted" });
    } catch (err) {
      res.status(500).json({ err });
    }
  }
}

module.exports = CommentController;
