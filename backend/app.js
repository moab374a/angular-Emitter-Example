const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require('mongoose')
const corsMiddleware = require('./config/cors')
const Post = require('./models/post')
const {json} = require("express");
const app = express();

mongoose.connect("mongodb+srv://admin:BwrfuSokC724IZ7x@cluster0.swsxz.mongodb.net/node-angular?retryWrites=true&w=majority").then(() => {
  console.log('Connected to DB')
}).catch(() => {
  console.log('conntected to DB Failed')
})

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));


app.options('*', corsMiddleware)

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT , PATCH, DELETE, OPTIONS",
  );
  next();
});

app.post("/api/posts", async (req, res, next) => {


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

app.get("/api/posts", (req, res, next) => {

  Post.find()
    .then(documents => {
      console.log(documents)
      res.status(200).json({
        message: "Posts fetched successfully!",
        posts: documents
      });
    })
});

app.delete("/api/posts/:id", (req, res, next) => {
  Post.deleteOne({_id: req.params.id}).then(err => {
    console.log(err)
    res.status(200).send()
  }).catch(err => {
    console.log(err)
    return res.status(500).send()
  })
  console.log(req.params.id)
})

app.get("/api/posts/:id", async (req, res, next) => {

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


app.put("/api/posts/:id", (req, res, next) => {

  Post.updateOne({_id: req.params.id}, {
    title: req.body.title,
    content: req.body.content
  }).then(
    (result) => {
      console.log(result)
      res.status(200).send({message: "Update Success"})
    }
  )
})

module.exports = app;
