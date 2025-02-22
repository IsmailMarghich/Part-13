const errorHandler = (error, request, response, next) => {
  console.log(error.name)
  if (error.name === 'SequelizeValidationError') {
    return response.status(400).send({ error: 'Invalid body data' })
  }
  if (error.name === 'SequelizeDatabaseError') {
    return response.status(400).send({ error: 'Invalid body data' })
  }

  next(error)
}
module.exports = { errorHandler }