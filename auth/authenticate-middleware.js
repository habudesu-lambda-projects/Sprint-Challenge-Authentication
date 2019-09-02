const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization
  if(authHeader) {
    const authHeaderStrings = authHeader.split(" ")
    if(authHeaderStrings[0].toLowerCase() === "bearer" && authHeaderStrings[1]) {
      jwt.verify(authHeaderStrings[1], "blah-blah-blah", (error, decodedToken) => {
        if(error) {
          res.status(401).json({message: "token verification error", error: error})
        } else {
          req.decodedJwt = decodedToken
          next()
        }
      })
    } else {
      res.status(401).json({message: "invalid scheme or missing token"})
    }
  } else {
    res.status(401).json({ message: "No Authorization Header" });
  }
};
