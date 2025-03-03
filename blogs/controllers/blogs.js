const router = require('express').Router()
const { Blog, User } = require('../models')
const { Op } = require('sequelize')

router.get('/', async (req, res) => {
  let where = {}

  if (req.query.search) {
    where = {
      [Op.or]: {
        title: {
          [Op.substring]:req.query.search
        },
        author: {
          [Op.substring]: req.query.search
        }
      }
    }
  }
  const blogs = await Blog.findAll({
    attributes: {
      exclude: ['userUd']
    },
    include: {
      model: User,
      as: 'users_reading',
      attributes: ['username']
    },
    where,
    order: [
      ['likes', 'DESC']
    ]
  })
  res.json(blogs)
})

router.post('/', async (req, res) => {
  const user = await User.findByPk(req.decodedToken.id)
  const blog = await Blog.create({ ...req.body, userId: user.id })
  return res.json(blog)

})

router.put('/:id', async (req, res) => {
  const blog = await Blog.findByPk(req.params.id)
  if(blog) {
    blog.likes = req.body.likes
    await blog.save()
    res.json(blog)
  }else {
    res.status(404).end()
  }

})

router.delete('/:id', async (req, res) => {
  const username = req.decodedToken.username
  const blog = await Blog.findByPk(req.params.id, {
    include: {
      model: User,
      attributes: ['username']
    }
  })
  if(blog && blog.user.username === username) {
    await blog.destroy()
    res.json(blog)
  }else {
    res.status(404).end()
  }
})

module.exports = router
