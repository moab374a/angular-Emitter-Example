const cors = require('cors')

const corsOptions = {
  origin : 'http://localhost:4200',
  optionsSuccessStatus: 200 ,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",

}

module.exports = cors(corsOptions)
