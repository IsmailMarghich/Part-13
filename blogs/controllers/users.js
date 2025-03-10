const router = require('express').Router()

const { User, Blog } = require('../models')
const { Op } = require('sequelize')

router.get('/', async (req, res) => {
  const users = await User.findAll({
    include: {
      model: Blog,
      as: 'readings',
      attributes: { exclude: ['userId'] }
    }
  })
  res.json(users)
})

router.post('/', async (req, res) => {
  const user = await User.create(req.body)
  res.json(user)

})

router.get('/:id', async (req, res) => {
  let where = {}
  if (req.query.read){
    where = {
      read: {
        [Op.eq]: req.query.read
      }
    }
  }
  const user = await User.findByPk(req.params.id, {
    include: [
      {
        model: Blog,
        as: 'readings',
        through: { attributes: ['id', 'read'], as: 'readinglists', where }
      }]
  })
  if (user) {
    res.json(user)
  } else {
    res.status(404).end()
  }
})

router.put('/:username', async (req, res) => {
  const user = await User.findOne({ where: { username: req.params.username } })
  if (user){
    user.username = req.body.username
    await user.save()
    res.json(user)
  }else {
    res.status(404).end()
  }
})



module.exports = router