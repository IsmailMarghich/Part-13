const Blog = require('./blog')
const User = require('./user')
const ReadingListEntry = require('./reading_list_entry.js')



User.belongsToMany(Blog, { through: ReadingListEntry, as: 'readings' })
Blog.belongsToMany(User, { through: ReadingListEntry, as: 'users_reading' })

module.exports = {
  Blog,
  User,
  ReadingListEntry
}
