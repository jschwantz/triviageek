const {fileLoader, mergeResolvers} = require('merge-graphql-schemas')
const path = require('path')

const resolversArray = fileLoader(path.join(__dirname, './resolvers'))

const resolvers = mergeResolvers(resolversArray)

module.exports = resolvers
