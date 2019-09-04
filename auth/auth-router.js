const router = require('express').Router();
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const User = require('./auth-model.js')

router.post('/register', async (req, res) => {
  const user = req.body
  const hashedPW = bcrypt.hashSync(user.password, 10)
  user.password = hashedPW
  try {
    const newUser = await User.addUser(user)
    res.status(201).json({newUser, user})
  }
  catch(error) {
    res.status(500).json({message: "Could Not Register User", error: error})
  }
});

router.post('/login', async (req, res) => {
  const {username, password} = req.body
  try {
    const user = await User.findUserBy({username}).first()
    if(user && bcrypt.compareSync(password, user.password)) {
      const token = createToken(user)
      res.status(200).json({message: "Login Successful", token})
    } else {
      res.status(400).json({message: "Invalid Credentials"})
    }
  }
  catch(error) {
    res.status(500).json({message: "Could Not Login", error: error})
  }
});

function createToken(user) {
  const payload = {
    subject: "user",
    username: user.username
  }
  const secret = "blah-blah-blah"
  const options = {
    expiresIn: '1h'
  }
  return jwt.sign(payload, secret, options)
}

module.exports = router;
