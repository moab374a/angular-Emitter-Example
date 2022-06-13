const jsonWebToken = require('jsonwebtoken')

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];

    jsonWebToken.verify(token, "secret_this_should_be_longer")

    console.log("Check Middleware")
    next()

  } catch {
    res.status(401).json({message: "not Auths"})
  }


}
