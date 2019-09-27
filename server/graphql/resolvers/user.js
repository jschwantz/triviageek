const users = [
  {
    id: 1,
    username: 'Jared'
  }
]

module.exports = {
  Query: {
    users() {
      return users
    },
    user(parent, args) {
      return users[0]
    }
  }
  // User: {

  // }
}
