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


module.exports = {
    getMyProfile,
    getUserProfile,
}