const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CommentSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    reply: [
      {
        type: Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
    post: {
      type: Schema.Types.ObjectId,
      ref: "Post",
    },
  },
  { timestamps: { createdAt: "created_at" } }
);

module.exports = mongoose.model("Comment", CommentSchema);
