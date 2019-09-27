const categories = [
  {
    id: 1,
    title: 'test'
  }
]

module.exports = {
  Query: {
    categories() {
      return categories
    },
    category(parent, args) {
      return categories[0]
    }
  }
}
