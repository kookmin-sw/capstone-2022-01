const {getUserIdByToken} = require("../utils");

async function getMyProfile(parent, args, context) {
    const user = await context.prisma.user.findUnique({ where: { id: context.userId } })

    if (!user) {
        throw new Error('No such user found')
    }

    return user
}

async function getUserProfile(parent, args, context) {
    const user = await context.prisma.user.findUnique({ where: { id: args.userid} })
    if (!user) {
        throw new Error('No such user found')
    }

    return user
}

async function getMyStuff(parent, args, context) {
    const userId = getUserIdByToken(context.token)

    const getMyStuff = await context.prisma.user.findUnique({
        where: {
            id: userId,
        },
        select: {
            stuffs: true, // All posts where authorId == 20
        },
    }).stuffs()
    return getMyStuff
}

async function getMyStuffStatus(parent, args, context) {
    const userId = getUserIdByToken(context.token)

    const getMyStuff = await context.prisma.user.findUnique({
        where: {
            id: userId,
        },
        select: {
            stuffs: true
        },
    }).stuffs();

    return getMyStuff.map(elm => elm.status === args.status? elm : '').filter(String);
}


async function getStuffByLocation(parent, args, context) {
    const stuffByLocation = await context.prisma.stuff.findMany({
        where: {
            location: args.location,
        }
    })

    console.log(stuffByLocation);
    return stuffByLocation
}

module.exports = {
    getMyProfile,
    getUserProfile,
    getMyStuff,
    getMyStuffStatus,
    getStuffByLocation
}