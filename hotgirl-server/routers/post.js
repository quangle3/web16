const express = require("express");
const PostRouter = express.Router();

const PostModel = require("../models/post");

// TODO: CRUD for post

PostRouter.post("/", (req, res) => {
	const newPost = req.body;
	PostModel.create(newPost, (err, postCreated) => {
		if(err) res.status(500).json({ success: 0, message: err })
		else res.status(201).json({ success: 1, message: "Create success!"});
	});
});

PostRouter.get("/", (req, res) => {
    PostModel.find({}, {_id: 0})
        .populate({
            path: "author", 
            select: {
                username: 1,
                email: 1,
                fullname: 1
            }
        })
        .exec((err,posts) => {
                if(err) res.status(500).json({ success: 0, message: err })
                else res.status(201).json({ success: 1, message: "Success!", data: posts });
        });
});

PostRouter.get("/:id", (req, res) => {
	const postId = req.params.id;
	PostModel.findById(postId, (err, postFound) => {
		if(err) res.status(500).json({ success: 0, message: err })
		else if(!postFound || !postFound._id) res.status(404).json({ success: 0, message: "Not found!" })
		else res.status(201).json({ success: 1, message: "Success!", data: postFound });
	});
});

PostRouter.put("/:id", (req, res) => {
	const update = req.body;
	const postId = req.params.id;
	PostModel.findByIdAndUpdate(postId, { $set: update }, { new: true }, (err, postUpdated) => {
		if(err) res.status(500).json({ success: 0, message: err })
		else res.status(201).json({ success: 1, message: "Update success!", data: postUpdated });
	});
});

PostRouter.delete("/:id", (req, res) => {
	const postId = req.params.id;
	PostModel.findByIdAndDelete(postId, (err) => {
		if(err) res.status(500).json({ success: 0, message: err })
		else res.status(201).json({ success: 1, message: "Delete success!"});
	});
});

module.exports = PostRouter;