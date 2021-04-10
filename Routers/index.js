const router = require("express").Router();
const UserRouter = require("./UserRouter");
const PostRouter = require("./PostRouter");
const CommentRouter = require("./CommentRouter");

router.use(UserRouter);
router.use(PostRouter);
router.use(CommentRouter);

module.exports = router;
