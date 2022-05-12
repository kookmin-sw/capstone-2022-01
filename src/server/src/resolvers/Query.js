const {getUserIdByToken} = require("../utils");

async function getMyProfile(parent, args, context) {
    /**
     * 내 user profile을 return하는 함수
     */
    const Authorization = context.request.get("Authorization");
    const userId = getUserIdByToken(Authorization)

    const user = await context.prisma.user.findUnique({where: {id: userId}})

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

async function getMyAlarms(parent, args, context) {
    /**
     * 내 alarms를 모두 return하는 함수
     */
    const Authorization = context.request.get("Authorization");
    const userId = getUserIdByToken(Authorization)
    const myAlarms = await context.prisma.user.findUnique({
        where: {
            id: userId,
        },
        select: {
            alarms: true, // All alarms
        },
    }).alarms()

    for (var i = 0; i < myAlarms.length; i++) {
        myAlarms[i]["owner"] = context.prisma.user.findUnique({
            where: { id: myAlarms[i].ownerId }
        })
    }
    return myAlarms
}

async function getMyStuff(parent, args, context) {
    /**
     * 내가 등록한 물건을 return하는 함수
     */
    const Authorization = context.request.get("Authorization");
    const userId = getUserIdByToken(Authorization)

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

async function getMyStuffByStatus(parent, args, context) {
    /**
     * 내가 등록한 물건중, 특정 상태("Communicating", "Finding", "Owned")에 해당하는 물건을 return하는 함수
     * @param args.status (String!) ("Communicating", "Finding", "Owned")
     */
    const Authorization = context.request.get("Authorization");
    const userId = getUserIdByToken(Authorization)

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

    return getMyStuff.map(elm => elm.status === args.status? elm : '').filter(String);
}


async function getStuffByLocation(parent, args, context) {
    /**
     * 특정 위치의 'Finding 상태'의 모든 물건을 return하는 함수
     * @param args.location (String!)
     */
    const stuffByLocation = await context.prisma.stuff.findMany({
        where: {
            AND: [
                {
                    location: args.location,
                },
                {
                    status: "Finding"
                }
            ]
        }
    })
    for (var i = 0; i < stuffByLocation.length; i++) {
        stuffByLocation[i]["postedBy"] = context.prisma.user.findUnique({
            where: { id: stuffByLocation[i].postedById }
        })
    }
    return stuffByLocation;
}

async function getStuffById(parent, args, context) {
    /**
     * 해당 id의 물건을 return하는 함수
     * @param args.id (Int!)
     */
    const stuffById = await context.prisma.stuff.findUnique({
        where: {
            id: args.id,
        }
    })
    stuffById["postedBy"] = context.prisma.user.findUnique({
        where: { id: stuffById.postedById }
    })
    return stuffById;
}

async function getFile(parent, args, context){
    /**
     * 해당 id의 File을 return하는 함수
     * @param args.id (Int!)
     */
    const files = await context.prisma.file.findUnique({
        where: { id: args.id }
    })

    files.uploadedBy = context.prisma.user.findUnique({ where: { id: files.uploadedById } })

    return files;
}

async function getFiles(parent, args, context){
    /**
     * 모든 Files을 return하는 함수
     */
    const files = await context.prisma.file.findMany({})
    for (var i = 0; i < files.length; i++) {
        files[i]["uploadedBy"] = context.prisma.user.findUnique({
            where: { id: files[i].uploadedById }
        })
    }
    return files;
}

module.exports = {
    getMyProfile,
    getUserProfile,
    getMyAlarms,
    getMyStuff,
    getMyStuffByStatus,
    getStuffByLocation,
    getStuffById,
    getFile,
    getFiles
}