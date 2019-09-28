const {fileLoader, mergeTypes} = require('merge-graphql-schemas')
const path = require('path')

const typesArray = fileLoader(path.join(__dirname, './typedefs'))
const typeDefs = mergeTypes(typesArray, {all: true})

module.exports = typeDefs

// # games: [GamePlay] @connection(name: "UserPlays")
//   # games: [GamePlay] @connection(name: "GamePlays")
