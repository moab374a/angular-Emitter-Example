path = require("path")
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require('mongoose')
const corsMiddleware = require('./config/cors')

const postsRoutes = require('./routes/posts')
const userRoutes = require('./routes/user')

const app = express();

mongoose.connect("mongodb+srv://admin:BwrfuSokC724IZ7x@cluster0.swsxz.mongodb.net/node-angular?retryWrites=true&w=majority").then(() => {
  console.log('Connected to DB')
}).catch(() => {
  console.log('conntected to DB Failed')
})

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use("/images" , express.static(path.join("backend/images")))


app.options('*', corsMiddleware)

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept , authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT , PATCH, DELETE, OPTIONS",
  );
  next();
});


app.use("/api/user" , userRoutes)
app.use("/api/posts", postsRoutes)

module.exports = app;
