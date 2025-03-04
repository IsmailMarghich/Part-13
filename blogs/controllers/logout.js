const router = require('express').Router()
const { Session } = require('../models')

router.delete('/', async (req, res) => {
  await Session.destroy({ where: { token: req.session.token } })
  res.status(204).end()
})

module.exports = router