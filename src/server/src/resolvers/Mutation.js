const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { APP_SECRET, getUserIdByToken } = require('../utils')


async function signup(parent, args, context, info) {
    const password = await bcrypt.hash(args.password, 10)

    const user = await context.prisma.user.create({ data: { ...args, password } })

    const token = jwt.sign({ userId: user.id }, APP_SECRET)

    return {
        token,
        user,
    }
}

async function login(parent, args, context, info) {
    const user = await context.prisma.user.findUnique({ where: { email: args.email } })
    if (!user) {
        throw new Error('No such user found')
    }

    const valid = await bcrypt.compare(args.password, user.password)
    if (!valid) {
        throw new Error('Invalid password')
    }

    const token = jwt.sign({ userId: user.id }, APP_SECRET)

    return {
        token,
        user,
    }
}

async function updateUserLocation(parent, args, context, info) {
    /**
     * 입력한 token으로 user_id를 받아오고, 내 location을 수정하는 함수
     * @param args.location (String!)
     */
    const user_id = getUserIdByToken(context.token)
    const updateUser = await context.prisma.user.update({
        where: {
            id: user_id,
        },
        data: {
            location: args.location,
        },
    })

    return updateUser
}

async function uploadStuff(parent, args, context, info) {
    /**
     * title의 물건을 생성하는 함수
     * @param args.title (String!)
     */
    const userId = getUserIdByToken(context.token)
    const newStuff = await context.prisma.stuff.create({
        data: {
            title: args.title,
            postedBy: { connect: {id:userId} }
        }
    })

    return newStuff
}

async function updateStuffStatus(parent, args, context, info) {
    /**
     * 물건의 상태를 바꿔주는 함수 "소통중", "찾는중", "내물건"
     * @param args.id (Int!) 물건 id
     * @param args.status (String!)
     */
    const updatedStuffStatus = await context.prisma.stuff.update({
        where: {
            id: args.id
        },
        data: {
            status: args.status
        },
    })
    return updatedStuffStatus
}

async function updateStuffLocation(parent, args, context, info) {
    /**
     * 물건의 위치를 변경해주는 함수
     * @param args.id (Int!) 물건 id
     * @param args.location (String!)
     */
    const updatedStuffLocation = await context.prisma.stuff.update({
        where: {
            id: args.id
        },
        data: {
            location: args.location
        },
    })
    return updatedStuffLocation
}

async function updateStuffReward(parent, args, context, info) {
    /**
     * 물건의 사례금을 변경해주는 함수
     * @param args.id (Int!) 물건 id
     * @param args.reward (Int!)
     */
    const updatedStuff = await context.prisma.stuff.update({
        where: {
            id: args.id
        },
        data: {
            reward: args.reward
        },
    })
    return updatedStuff
}

module.exports = {
    signup,
    login,
    updateUserLocation,
    uploadStuff,
    updateStuffStatus,
    updateStuffReward,
    updateStuffLocation
}