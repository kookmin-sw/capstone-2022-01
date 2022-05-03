const { PrismaClient } = require('@prisma/client')

const { GraphQLServer } = require("graphql-yoga");
const express = require("express");

const Query = require('./resolvers/Query')
const Mutation = require('./resolvers/Mutation')

const prisma = new PrismaClient()

const resolvers = {
    Query,
    Mutation,
};

const server = new GraphQLServer({
    typeDefs: "./src/schema.graphql",
    resolvers,
    context: req => {
        return {
            ...req,
            prisma,
        };
    }
});

const options = {
    port: process.env.PORT || 4000
};
server.express.use("/images", express.static(__dirname + "/images"));
server.start(options, ({ port }) =>
    console.log(
        `Server started, listening on port ${port} for incoming requests.\n`
    )
);
