const jwt = require('jsonwebtoken')
const { Session, User } = require('../models')
const errorHandler = (error, request, response, next) => {
  console.error(error)
  if (error.name === 'SequelizeValidationError' && error.message.includes('Validation isEmail on username failed')){
    return response.status(400).send({ error: 'username must be a valid email' })
  }if (error.name === 'SequelizeValidationError' && error.message.includes('on year failed')){
    return response.status(400).send({ error: 'year of a blog must be between 1991 and the current year' })
  }
  if (error.name === 'SequelizeValidationError') {
    return response.status(400).send({ error: 'Invalid body data, validation error' })
  }
  if (error.name === 'SequelizeDatabaseError') {
    return response.status(400).send({ error: 'Invalid body data, database error' })
  }
  else if (error.name ===  'JsonWebTokenError') {
    return response.status(401).json({ error: 'token invalid' })
  }
  else if (error.name === 'TokenExpiredError') {
    return response.status(401).json({
      error: 'token expired'
    })}
  next(error)
}
const tokenExtractor = async (req, res, next) => {
  const authorization = req.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    try {
      const decodedToken = jwt.verify(authorization.substring(7), process.env.SECRET)
      const session = await Session.findOne({ where: { token: authorization.substring(7) } })
      if (!session) {
        return res.status(401).json({ error: 'Session expired or invalid token' })
      }
      console.log(decodedToken)
      const user = await User.findByPk(decodedToken.id)

      if (user.disabled) {
        return res.status(403).json({ error: 'User is disabled' })
      }
      req.decodedToken = decodedToken
      req.session = session
    } catch{
      return res.status(401).json({ error: 'token invalid' })
    }
  }  else {
    return res.status(401).json({ error: 'token missing' })
  }
  next()
}
module.exports = { errorHandler, tokenExtractor }