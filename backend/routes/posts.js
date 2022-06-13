const express = require("express");
const mongoose = require("mongoose");
const Post = require("../models/post");
const router = express.Router();


router.post("", async (req, res, next) => {


  const post = new Post({
    title: req.body.title,
    content: req.body.content
  })

  let createdPost = await post.save();

  res.status(201).json({
    message: "Post added !",
    postId: createdPost._id
  })

});

router.get( "",(req, res, next) => {

  Post.find()
    .then(documents => {
      console.log(documents)
      res.status(200).json({
        message: "Posts fetched successfully!",
        posts: documents
      });
    })
});

router.delete("/:id", (req, res, next) => {
  Post.deleteOne({_id: req.params.id}).then(err => {
    console.log(err)
    res.status(200).send()
  }).catch(err => {
    console.log(err)
    return res.status(500).send()
  })
  console.log(req.params.id)
})

router.get("/:id", async (req, res, next) => {

  let id = mongoose.Types.ObjectId(req.params.id);

  Post.findById(id).then(result => {
    console.log("Send It")
    return res.status(201).send({
      id: result._id,
      title: result.title,
      content: result.content
    })

  }).catch(err => {
    console.log(err)
    return res.status(500).send({error: err})
  })

})


router.put("/:id", (req, res, next) => {

  Post.updateOne({_id: req.params.id}, {
    title: req.body.title,
    content: req.body.content
  }).then(
    (result) => {
      console.log(result)
      res.status(200).send({message: "Update Success"})
    }
  ).catch(err => {
    console.log(err)
    res.status(500).send(err)
  })
})

module.exports = router;
