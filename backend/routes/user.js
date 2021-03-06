const express = require("express");
const User = require("../models/user");
const router = express.Router();
const bcrypt = require('bcrypt')
const jsonWebToken = require('jsonwebtoken')
/** Post New User **/
router.post("/signup", (req, res) => {
  bcrypt.hash(req.body.password, 10).then(hash => {
    const user = new User({
      email: req.body.email,
      password: hash
    });

    user.save().then(result => {
      res.status(201).json({
        message: 'User created',
        result: result
      })
    }).catch(err => {
      res.status(500).json({
        error: err
      })
    })
  })

})


router.post("/login", (req, res) => {
  console.log("In Login Post")
  let fetchedUser ;
  User.findOne({email: req.body.email}).then(user => {
    if (!user) {
      return res.status(401).json({message: "Auth Failed"})
    }
    fetchedUser = user
    return bcrypt.compare(req.body.password, user.password)
  }).then(result => {
    if(!result){
     return  res.status(401).json({message: "Auth Failed"})
    }
    const token = jsonWebToken.sign(
      {email: fetchedUser.email , userId: fetchedUser._id} ,
      "secret_this_should_be_longer" ,
      {expiresIn: "1h" }
      )

    console.log("Everything went Fine")
    res.status(200).json({token:token})

  }).catch(error=> {
    res.status(401).json({message: "Auth Failed" , err : error})
  })

})

module.exports = router
