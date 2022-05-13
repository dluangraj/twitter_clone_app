const { GraphQLString, GraphQLList, GraphQLNonNull, GraphQLObjectType, GraphQLInt } = require('graphql')
const { QuestionInputType, AnswerInputType } = require('./types')
const { User, Quiz, Question, Submission } = require('../models')
const { createJwtToken } = require('../util/auth')

const register = {
    type: GraphQLString,
    args: {
        username: { type: GraphQLString },
        email: { type: GraphQLString },
        password: { type: GraphQLString },
    },
    async resolve(parent, args) {
        
        const checkUser = await User.findOne({ email: args.email })
        if (checkUser) {
            throw new Error("User with this email address already exists")
        }

        const { username, email, password } = args
        const user = new User({ username, email, password })

        await user.save()

        const token = createJwtToken(user)
        return token
    }
}

const login = {
    type: GraphQLString,
    args: {
        email: { type: GraphQLString },
        password: { type: GraphQLString }
    },
    async resolve(parent, args) {
        const user = await User.findOne({ email: args.email })
        if (!user || args.password !== user.password) {
            throw new Error("Invalid credentials")
        }

        const token = createJwtToken(user)
        return token
    }
}

const createPost = {
    type: GraphQLString,
    args: {
        title: {
            type: GraphQLString
        },
        description: {
            type: GraphQLString
        },
        userId: {
            type: GraphQLString
        }
    },
    async resolve(parent, args) {
        /* Generate slug version of post for url */
        let slugify = args.title.toLowerCase()
            .replace(/[^\w ]+/g, '')
            .replace(/ +/g, '-')
        let fullSlug = ''

        /* Add a random integer to the end of the slug, check that slug doesn't already exist.
        *  If it does exist, generate new slug. Else continue.
        */
        while (true) {
            let slugId = Math.floor(Math.random()*10000)
            fullSlug = `${slugify}-${slugId}`

            const existingPost = await Post.findOne({ slug: fullSlug })
            
            if (!existingPost)
                break;
        }

        const post = new Post({
            title: args.title,
            slug: fullSlug,
            description: args.description,
            userId: args.userId
        })

        await post.save()

    //     /* Create question types and connect to new quiz */
    //     for (const question of args.questions) {
    //         const questionItem = new Question({
    //             title: question.title,
    //             correctAnswer: question.correctAnswer,
    //             order: Number(question.order),
    //             quizId: quiz.id
    //         })
    //         questionItem.save()
    //     }

    //     return quiz.slug
     }
}

module.exports = { register, login, createPost }