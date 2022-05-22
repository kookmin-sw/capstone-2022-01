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

    return await context.prisma.alarm.findMany({
        where: {
            targetUserId: userId,
        },
        include: {
            owner: true
        }
    })
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

    if (!['Communicating', 'Finding', 'Owned'].includes(args.status)) {
        throw new Error("Only the following status are supported: 'Communicating', 'Finding', 'Owned'")
    }

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
    return await context.prisma.stuff.findMany({
        where: {
            AND: [
                {location: args.location},
                {status: "Finding"}
            ]
        },
        include:{
            postedBy: true
        }
    })
}

async function getStuffById(parent, args, context) {
    /**
     * 해당 id의 물건을 return하는 함수
     * @param args.id (Int!)
     */
    return await context.prisma.stuff.findUnique({
        where: {
            id: args.id,
        },
        include:{
            postedBy: true
        }
    })
}

async function getFile(parent, args, context){
    /**
     * 해당 id의 File을 return하는 함수
     * @param args.id (Int!)
     */
    return await context.prisma.file.findUnique({
        where: { id: args.id },
        include: {
            uploadedBy: true
        }
    })
}

async function getFiles(parent, args, context){
    /**
     * 내가 올린 모든 Files을 return하는 함수
     */
    const Authorization = context.request.get("Authorization");
    const userId = getUserIdByToken(Authorization)

    return await context.prisma.file.findMany({
        where: {
            uploadedById: userId
        },
        include: {
            uploadedBy: true
        }
    })
}


async function getMyHostChats(parent, args, context) {
    /**
     * 내가 Host인 채팅방을 return하는 함수
     */
    const Authorization = context.request.get("Authorization");
    const userId = getUserIdByToken(Authorization)

    return await context.prisma.chat.findMany({
        where: {
            hostId: userId
        },
        include: {
            messages: true,
            participant: true,
            host: true
        },
    });
}

async function getMyJoinChats(parent, args, context) {
    /**
     * 내가 participant로 참가하는 채팅방을 return하는 함수
     */
    const Authorization = context.request.get("Authorization");
    const userId = getUserIdByToken(Authorization)

    return await context.prisma.chat.findMany({
        where: {
            participantId: userId
        },
        include: {
            messages: true,
            participant: true,
            host: true
        },
    });
}

async function getMyChats(parent, args, context) {
    /**
     * 내가 참가하는(participant+host) 모든 채팅방을 return하는 함수
     */
    const Authorization = context.request.get("Authorization");
    const userId = getUserIdByToken(Authorization)

    const joinChats = await context.prisma.chat.findMany({
        where: {
            participantId: userId
        },
        include: {
            messages: true,
            participant: true,
            host: true
        },
    });

    const hostChats = await context.prisma.chat.findMany({
        where: {
            hostId: userId
        },
        include: {
            messages: true,
            participant: true,
            host: true
        },
    });

    return joinChats.concat(hostChats)
}

async function getChat(parent, args, context) {
    /**
     * 해당 id의 채팅방을 return하는 함수
     * participant나 host일 경우, 해당 lastconnect가 업데이트된다.
     * @param args.id (Int!) 채팅방 ID
     */
    const Authorization = context.request.get("Authorization");
    const userId = getUserIdByToken(Authorization)

    const chat = await context.prisma.chat.findUnique({
        where: {
            id: args.id,
        },
        include: {
            messages: true,
            host: true,
            participant: true
        },
    })

    // 해당 채팅에 host로 되어있는지, 참가자로 되어있는지를 판별하고, 최종접속기록을 업데이트함
    if (chat.participantId === userId){
        return await context.prisma.chat.update({
            where: {
                id: args.id,
            },
            data: {
                lastConnectParti: new Date()
            },
            include: {
                messages: true,
                host: true,
                participant: true
            },
        })
    }else {
        if (chat.hostId === userId){
            return await context.prisma.chat.update({
                where: {
                    id: args.id,
                },
                data: {
                    lastConnectHost: new Date()
                },
                include: {
                    messages: true,
                    host: true,
                    participant: true
                },
            })
        }else{
            throw new Error("You are neither a host nor a participant.")
        }
    }
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
    getFiles,
    getMyHostChats,
    getMyJoinChats,
    getMyChats,
    getChat
}