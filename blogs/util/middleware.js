const jwt = require('jsonwebtoken')

const errorHandler = (error, request, response, next) => {
  console.error(error)
  if (error.name === 'SequelizeValidationError' && error.message.includes('Validation isEmail on username failed')){
    return response.status(400).send({ error: 'username must be a valid email' })
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
const tokenExtractor = (req, res, next) => {
  const authorization = req.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    try {
      req.decodedToken = jwt.verify(authorization.substring(7), process.env.SECRET)
    } catch{
      return res.status(401).json({ error: 'token invalid' })
    }
  }  else {
    return res.status(401).json({ error: 'token missing' })
  }
  next()
}
module.exports = { errorHandler, tokenExtractor }