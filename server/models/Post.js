const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PostSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
    },
    url: {
      type: String,
    },
    status: {
      type: String,
      enum: ["TO LEARN", "LEARN", "LEARNED"],
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "users",
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("posts", PostSchema);
