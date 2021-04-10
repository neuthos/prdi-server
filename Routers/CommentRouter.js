const CommentRouter = require("express").Router();
const CommentController = require("../Controllers/CommentController");
const authenticate = require("../middlewares/authentication");

CommentRouter.get(
  "/comment/:commentId",
  authenticate,
  CommentController.getComment
);

CommentRouter.post(
  "/comment/:postId",
  authenticate,
  CommentController.createComment
);

CommentRouter.post(
  "/reply/:commentId",
  authenticate,
  CommentController.replyComment
);

CommentRouter.put(
  "/comment/:commentId",
  authenticate,
  CommentController.updateComment
);

CommentRouter.delete(
  "/comment/:commentId",
  authenticate,
  CommentController.deleteComment
);

module.exports = CommentRouter;
