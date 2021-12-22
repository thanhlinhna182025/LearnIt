const express = require("express");
const router = express.Router();
const Post = require("../models/Post");
const verifyToken = require("../middleware/auth");

// router.get("/", (req, res) => {
//   res.send("post router");
// });

//@router POST api/post
//@Desc create post by userId
//access private
router.post("/", verifyToken, async (req, res) => {
  const { title, desc, url, status } = req.body;
  //simple validation
  if (!title) {
    res.status(400).json({ success: false, message: "title is required" });
  }
  //Create new post
  try {
    const newPost = new Post({
      title,
      desc,
      url: url.startsWith("https://") ? url : `https://${url}`,
      status: status || "to learn",
      user: req.userId,
    });
    await newPost.save();
    res
      .status(201)
      .json({ success: true, message: "Post created", posts: newPost });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

//@router GET api/post
//@Desc get post by userId
//access private
router.get("/", verifyToken, async (req, res) => {
  try {
    const posts = await Post.find({ user: req.userId }).populate("user", [
      "username",
    ]);
    res.json({ success: true, posts });
  } catch (error) {
    console.log(error);
    res.status(404).json({ success: false, message: "not found" });
  }
});
//Router PUT api/post/:id
//@Desc update post
//access private

router.put("/:id", verifyToken, async (req, res) => {
  const { title, desc, url, status } = req.body;
  if (!title)
    return res
      .status(404)
      .json({ success: false, message: "title is required" });
  try {
    let updatePost = {
      title,
      desc: desc || "",
      url: (url.startsWith("https://") ? url : `https://${url}`) || "",
      status: status || "to learn",
    };
    const updateCondition = { _id: req.params.id, user: req.userId };
    updatePost = await Post.findOneAndUpdate(updateCondition, updateCondition, {
      new: true,
    });
    // User not authorised to update post or post not found
    if (!updatePost) {
      return res.status(401).json({
        success: false,
        message: "Post not found or user not authorised",
      });
    }
    res
      .status(200)
      .json({ success: true, message: "Updated", post: updatePost });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});
//Router DELTE api/post/:id
//@Desc delete post
//access private

router.delete("/:id", verifyToken, async (req, res) => {
  const id = req.params.id;
  const conditionDelete = { _id: id, user: req.userId };
  try {
    const postDelete = await Post.findOneAndDelete(conditionDelete);
    if (!postDelete) {
      return res.status(401).json({
        success: false,
        message: "Post not found or user notAuthorized",
      });
    }
    res
      .status(200)
      .json({ success: true, message: "post deleted", post: postDelete });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

module.exports = router;
