require('dotenv').config()
const express = require('express')
const app = express()
const { Blog } = require('./models/blog')

app.use(express.json())

app.get('/api/blogs', async (req, res) => {
  const blogs = await Blog.findAll()

  res.json(blogs)
})

app.post('/api/blogs', async (req, res) => {
  try {
    const blogs = await Blog.create(req.body)
    return res.json(blogs)
  } catch(error) {
    return res.status(400).json({ error })
  }
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})