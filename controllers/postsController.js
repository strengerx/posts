const { validationResult } = require("express-validator");
const postsModel = require("../model/postsModel");

const posts = async (req, res) => {
    try {
        const postsData = await postsModel.find();
        res.status(200).json(postsData);
    } catch (err) {
        console.error("Error fetching posts:", err);
        res.status(500).json({ error: "An error occurred while fetching posts." });
    }
};

const postAdd = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const post = new postsModel(req.body);
        await post.save();
        res.status(201).json(post);
    } catch (err) {
        console.error("Error adding post:", err);
        res.status(500).json({ error: "An error occurred while adding the post." });
    }
};

const postByID = async (req, res) => {
    const { postID } = req.params;
    if (!postID) {
        return res.status(400).json({ msg: "Post ID is required." });
    }

    try {
        const post = await postsModel.findById(postID);
        if (!post) {
            return res.status(404).json({ msg: "Post not found." });
        }
        res.status(200).json(post);
    } catch (err) {
        console.error("Error fetching post by ID:", err);
        res.status(500).json({ error: "An error occurred while fetching the post." });
    }
};

module.exports = { posts, postAdd, postByID };
