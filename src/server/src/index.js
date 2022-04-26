const { PrismaClient } = require('@prisma/client')

const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const {
    GraphQLUpload,
    graphqlUploadExpress, // A Koa implementation is also exported.
} = require('graphql-upload');

const { getUserId } = require('./utils');
const Query = require('./resolvers/Query')
const Mutation = require('./resolvers/Mutation')

const fs = require('fs');
const path = require('path');

const prisma = new PrismaClient()


const resolvers = {
    Query,
    Mutation,
    Upload: GraphQLUpload
}

async function startServer() {
    const server = new ApolloServer({
        typeDefs: fs.readFileSync(
            path.join(__dirname, 'schema.graphql'),
            'utf8'
        ),
        resolvers,
        uploads: false, // add this
        context: ({ req }) => {
            return {
                ...req,
                prisma,
                userId:
                    req && req.headers.authorization
                        ? getUserId(req)
                        : null,
                token:
                req.headers.authorization
            };
        }
    })
    await server.start();

    const app = express();

    app.use(graphqlUploadExpress());

    server.applyMiddleware({ app });

    await new Promise (r => app.listen(
        { port: 4000 }, r));

    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
}

startServer();
