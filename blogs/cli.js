const { Blog } = require('./models/blog')

const logBlogs = async () => {
  const blogs = await Blog.findAll()
  blogs.map((blog) => {
    blog = blog.toJSON()
    console.log(`${blog.author}: ${blog.title}, ${blog.likes} likes`)
  })
}


logBlogs()