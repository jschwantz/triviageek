const games = [
  {
    id: 1,
    roundCount: 5,
    difficulty: 'Default'
  }
]

module.exports = {
  Query: {
    games() {
      return games
    },
    game(parent, args) {
      return games[0]
    }
  }
}
