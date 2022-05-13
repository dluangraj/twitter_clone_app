const { GraphQLSchema, GraphQLObjectType } = require('graphql');
const queries = require('./queries');
// Import mutations
const mutations = require('./mutations')

const QueryType = new GraphQLObjectType ({
    name: 'QueryType',
    description: 'Queries',
    fields: queries
})

// Define MutationType
const MutationType = new GraphQLObjectType({
    name: "MutationType",
    description: "Mutations",
    fields: mutations
})

module.exports = new GraphQLSchema({ query: QueryType, mutation: MutationType })