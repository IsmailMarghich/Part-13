const router = require('express').Router()
const { ReadingListEntry, User, Blog } = require('../models')


router.post('/', async (req,res) => {
  const { blogId, userId } = req.body
  const newEntry = await ReadingListEntry.create({ blogId, userId, read: false })
  return res.status(201).json(newEntry)

})
router.put('/:id', async (req, res) => {
  const userId = req.decodedToken.id
  const readingListEntry = await ReadingListEntry.findByPk(req.params.id)
  if (readingListEntry && readingListEntry.userId === userId){
    readingListEntry.read = req.body.read
    await readingListEntry.save()
    res.json(readingListEntry)
  }else{
    res.status(404).end()
  }
})
module.exports = router
