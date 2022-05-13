const { GraphQLObjectType, GraphQLInputObjectType, GraphQLID, GraphQLString, 
    GraphQLList, GraphQLInt, GraphQLBoolean, GraphQLFloat} = require('graphql')

const { User, Post } = require('../models');

const UserType = new GraphQLObjectType({
name: 'User',
description: 'User type',
fields: () => ({
    id: { type: GraphQLID },
    username: { type: GraphQLString },
    email: { type: GraphQLString },
    posts: {
        type: new GraphQLList(PostType),
        resolve(parent, args) {
            return Post.find({ userId: parent.id })
        }
    }
})
})

const PostType = new GraphQLObjectType({
name: 'Post',
description: 'Post Type',
fields: () => ({
    id: { type: GraphQLID },
    slug: { type: GraphQLString },
    title: { type: GraphQLString },
    description: { type: GraphQLString },
    postId: { type: GraphQLString },
    order: { type: GraphQLInt }
})
})

const PostInputType = new GraphQLInputObjectType({
name: 'PostInput',
description: 'Post Input Type',
fields: () => ({
    title: { type: GraphQLString },
    description: { type: GraphQLID }
})
})


module.exports = {
UserType,
PostType,
PostInputType
}