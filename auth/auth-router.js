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
    res.status(201).json(user)
  }
  catch(error) {
    res.status(500).json({message: "Could Not Register User", error: error})
  }
});

router.post('/login', (req, res) => {
  // implement login
});

module.exports = router;
