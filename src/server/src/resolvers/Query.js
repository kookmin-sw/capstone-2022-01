const {getUserIdByToken} = require("../utils");

async function getMyProfile(parent, args, context) {
    /**
     * 내 user profile을 return하는 함수
     */
    const user = await context.prisma.user.findUnique({ where: { id: context.userId } })

    if (!user) {
        throw new Error('No such user found')
    }

    return user
}

async function getUserProfile(parent, args, context) {
    /**
     * user_id의 profile을 return하는 함수
     * @param args.userid (Int!) 해당 유저 id
     */
    const user = await context.prisma.user.findUnique({ where: { id: args.userid} })
    if (!user) {
        throw new Error('No such user found')
    }

    return user
}

async function getMyStuff(parent, args, context) {
    /**
     * 내가 등록한 물건을 return하는 함수
     */
    const userId = getUserIdByToken(context.token)

    const getMyStuff = await context.prisma.user.findUnique({
        where: {
            id: userId,
        },
        select: {
            stuffs: true, // All posts where authorId == 20
        },
    }).stuffs()

    for (var i = 0; i < getMyStuff.length; i++) {
        getMyStuff[i]["postedBy"] = context.prisma.user.findUnique({
                where: { id: getMyStuff[i].postedById }
            })
    }
    return getMyStuff;
}

async function getMyStuffStatus(parent, args, context) {
    /**
     * 내가 등록한 물건중, 특정 상태("소통중", "찾는중", "내물건")에 해당하는 물건을 return하는 함수
     * @param args.status (String!) ("소통중", "찾는중", "내물건")
     */
    const userId = getUserIdByToken(context.token)

    const getMyStuff = await context.prisma.user.findUnique({
        where: {
            id: userId,
        },
        select: {
            stuffs: true
        },
    }).stuffs();

    for (var i = 0; i < getMyStuff.length; i++) {
        getMyStuff[i]["postedBy"] = context.prisma.user.findUnique({
            where: { id: getMyStuff[i].postedById }
        })
    }
    return getMyStuff;
}


async function getStuffByLocation(parent, args, context) {
    /**
     * 특정 위치에 등록된 모든 물건을 return하는 함수
     * @param args.location (String!)
     */
    const stuffByLocation = await context.prisma.stuff.findMany({
        where: {
            location: args.location,
        }
    })
    for (var i = 0; i < stuffByLocation.length; i++) {
        stuffByLocation[i]["postedBy"] = context.prisma.user.findUnique({
            where: { id: stuffByLocation[i].postedById }
        })
    }
    return stuffByLocation;
}

async function getFile(parent, args, context){
    const files = await context.prisma.file.findUnique({
        where: {
            id: args.id,
        }
    })
    return files.map(elm => elm.uploadedBy =
        context.prisma.user.findUnique({ where: { id: elm.uploadedById } }))
}

async function getFiles(parent, args, context){
    const files = await context.prisma.file.findMany({})
    return files.map(elm => elm.uploadedBy =
        context.prisma.user.findUnique({ where: { id: elm.uploadedById } }))
}

module.exports = {
    getMyProfile,
    getUserProfile,
    getMyStuff,
    getMyStuffStatus,
    getStuffByLocation,
    getFile,
    getFiles
}