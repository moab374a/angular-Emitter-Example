const express = require("express");
const multer = require('multer')
const mongoose = require("mongoose");
const Post = require("../models/post");
const router = express.Router();

const MIME_TYPE_MAP = {
  "image/png": "png",
  "image/jpeg": "jpg",
  "image/jpg": "jpg"
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const isValid = MIME_TYPE_MAP[file.mimetype];
    let error = new Error("Invalid mime type");
    if (isValid) {
      error = null;
    }
    cb(error, "backend/images");
  },
  filename: (req, file, cb) => {
    const name = file.originalname
      .toLowerCase()
      .split(" ")
      .join("-");
    const ext = MIME_TYPE_MAP[file.mimetype];
    cb(null, name + "-" + Date.now() + "." + ext);
  }
});

router.post("", multer({storage: storage}).single("image"), async (req, res, next) => {

  const url = req.protocol + '://' + req.get('host');

  const post = new Post({
    title: req.body.title,
    content: req.body.content,
    imagePath: url + "/images/" + req.file.filename
  })

  let createdPost = await post.save();

  res.status(201).json({
    message: "Post added !",
    post: {
      id: createdPost._id,
      title: createdPost.title,
      content: createdPost.content,
      imagePath: createdPost.imagePath
    }
  })

});

router.get("", (req, res, next) => {

  const pageSize = +req.query.pagesize;
  const currentPage = +req.query.page;
  const postQuery = Post.find()
  let fetchedPosts;

  //only Select a part of the info
  if (pageSize && currentPage) {

    postQuery
      .skip(pageSize * (currentPage - 1))
      .limit(pageSize);
  }
  postQuery.then(documents => {
    fetchedPosts = documents;
      return Post.count();
    }).then(count => {
    res.status(200).json({
      message: "Posts fetched successfully!",
      posts: fetchedPosts,
      moodiPosts: count
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

/** git Single Post **/
router.get("/:id", async (req, res, next) => {

  let id = mongoose.Types.ObjectId(req.params.id);

  Post.findById(id).then(result => {
    console.log("Send It")
    return res.status(201).send({
      id: result._id,
      title: result.title,
      content: result.content,
      imagePath: result.imagePath
    })

  }).catch(err => {
    console.log(err)
    return res.status(500).send({error: err})
  })

})

router.put("/:id", multer({storage: storage}).single("image"), (req, res, next) => {

  let imagePath = req.body.imagePath
  if (req.file) {
    const url = req.protocol + '://' + req.get('host');
    imagePath = url + "/images/" + req.file.filename
  }
  Post.updateOne({_id: req.params.id}, {
    title: req.body.title,
    content: req.body.content,
    imagePath: imagePath
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
