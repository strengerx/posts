const { validationResult } = require("express-validator")
const postsModel = require("../model/postsModel")

const posts = async (req, res) => {
    try {
        const postsData = await postsModel.find();
        // console.log(postsData);
        res.json(postsData);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const postAdd = async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const post = new postsModel(req.body);
        await post.save();
        res.status(201).json(post);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

const postByID = async (req, res) => {
    const postID = req.params.postID
    if (!postID) {
        return res.status(400).json({ msg: `provide post id` })
    }

    try {
        const post = await postsModel.findById(postID)
        res.json(post)
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

module.exports = { posts, postAdd, postByID }