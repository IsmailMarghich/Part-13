const express = require('express')
require('express-async-errors')

const app = express()
const middleware = require('./util/middleware')

const { PORT } = require('./util/config')
const { connectToDatabase } = require('./util/db')

const blogRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const authorRouter = require('./controllers/authors')
const readingListRouter = require('./controllers/readinglists')
const logoutRouter = require('./controllers/logout')
app.use(express.json())
app.use('/api/blogs',middleware.tokenExtractor ,blogRouter )
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)
app.use('/api/authors',middleware.tokenExtractor, authorRouter )
app.use('/api/readinglists',middleware.tokenExtractor,readingListRouter)
app.use('/api/logout', middleware.tokenExtractor, logoutRouter)
app.use(middleware.errorHandler)

const start = async () => {
  await connectToDatabase()
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })
}

start()