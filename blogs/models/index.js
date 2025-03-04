const Blog = require('./blog')
const User = require('./user')
const ReadingListEntry = require('./reading_list_entry.js')
const Session = require('./session.js')

User.belongsToMany(Blog, { through: ReadingListEntry, as: 'readings' })
Blog.belongsToMany(User, { through: ReadingListEntry, as: 'users_reading' })
User.hasMany(Session)
Session.belongsTo(User)

module.exports = {
  Blog,
  User,
  ReadingListEntry,
  Session
}
