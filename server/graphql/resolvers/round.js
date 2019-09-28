const rounds = [
  {
    id: 1,
    game: {
      id: 1,
      roundCount: 5,
      difficulty: 'Default'
    },
    category: {
      id: 1,
      title: 'test'
    },
    questions: []
  }
]

module.exports = {
  Query: {
    rounds() {
      return rounds
    },
    round(parent, args) {
      return rounds[0]
    }
  }
}
