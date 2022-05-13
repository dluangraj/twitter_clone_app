const { GraphQLList, GraphQLID, GraphQLString } = require('graphql');
const { UserType, PostType } = require('./types');
const { User, Post } = require('../models');

const users = {
    type: new GraphQLList(UserType),
    description: 'Query all users in the database',
    resolve( parent, args ) {
        return User.find()
    }
}
const posts = {
    type: new GraphQLList(PostType),
    description: 'Query all posts in the database',
    resolve( parent, args) {
        return Post.find()
    }
}

const user = {
    type: UserType,
    description: 'Query user by id',
    args: {
        id: { type: GraphQLID }
    },
    resolve(parent, args) {
        return User.findById(args.id)
    }
}

const postBySlug = {
    type: PostType,
    description: 'Query post by slug value',
    args: {
        slug: { type: GraphQLString }
    },
    async resolve(parent, args) {
        return Post.findOne({ slug: args.slug })
    }
}

const postById = {
    type: PostType,
    description: 'Query posts by ID',
    args: {
        id: { type: GraphQLString }
    },
    async resolve (parent, args) {
        return Post.findById(args.id)
    }
}

module.exports = { users, posts, user, postBySlug, postById }