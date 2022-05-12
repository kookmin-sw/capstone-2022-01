const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { APP_SECRET, getUserIdByToken } = require('../utils')
const path = require("path");
const { createWriteStream } = require("fs");
const shortId = require("shortid");

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

async function tradingReward(parent, args, context, info) {
    /**
     * 사례금을 전달하는 함수
     * @param args.id (Int!) 물건의 id
     * return 내 profile
     * */
    const Authorization = context.request.get("Authorization");
    const myUserId = getUserIdByToken(Authorization)

    const stuff = await context.prisma.stuff.findUnique({ where: { id: args.id } })
    const targetProfile = await context.prisma.user.findUnique({ where: { id: stuff.acquirerId} })
    const myProfile = await context.prisma.user.findUnique({ where: { id: myUserId } })

    // 물건 등록한 사람과 이 함수를 콜한 사람이 다를 경우
    if (stuff.postedById !== myUserId){
        throw new Error("This function is only available to postBy user.")
    }

    // 물건의 상태가 Communicating이 아닐 경우
    if (stuff.status !== "Communicating") {
        throw new Error("TradingReward Only Communicating status")
    }

    // 상대방의 id가 없을경우(-1일 경우)
    if (stuff.acquirerId === -1) {
        throw new Error("Can not found Stuff's acquireId")
    }

    // 내 소지금액이, trading reward보다 작을경우
    if (stuff.reward > myProfile.point) {
        throw new Error("Not have enough money")
    }

    // 해당 유저를 찾지 못하였을 때
    if (!myProfile || !targetProfile) {
        throw new Error('No such user found')
    }

    // 사례금 전달
    const updatedTargetUserPoint = await context.prisma.user.update({
        where: {
            id: stuff.acquirerId
        },
        data: {
            point: targetProfile.point + stuff.reward
        },
    })
    const updatedMyPoint = await context.prisma.user.update({
        where: {
            id: myUserId
        },
        data: {
            point: myProfile.point - stuff.reward
        },
    })

    // 물건 상태 Own으로 초기화

    const updatedStuffStatus = await context.prisma.stuff.update({
        where: {
            id: args.id
        },
        data: {
            status: "Owned",
            location: "",
            reward: 0,
            acquirerId: -1
        },
    })
    return updatedMyPoint
}

async function updateMyLocation(parent, args, context, info) {
    /**
     * 입력한 token으로 user_id를 받아오고, 내 location을 수정하는 함수
     * @param args.location (String!)
     */
    const Authorization = context.request.get("Authorization");
    const userId = getUserIdByToken(Authorization)
    const updateUser = await context.prisma.user.update({
        where: {
            id: userId,
        },
        data: {
            location: args.location,
        },
    })

    return updateUser
}

async function updateMyImageurl(parent, args, context, info) {
    /**
     * 입력한 token으로 user_id를 받아오고, 내 imageUrl을 수정하는 함수
     * @param args.imageUrl (String!)
     */
    const Authorization = context.request.get("Authorization");
    const userId = getUserIdByToken(Authorization)
    const updateUser = await context.prisma.user.update({
        where: {
            id: userId,
        },
        data: {
            imageUrl: args.imageUrl,
        },
    })

    return updateUser
}

async function singleUpload (parent, args, context) {
    /**
     * Image Upload 함수
     * @param args.file
     */
    const Authorization = context.request.get("Authorization");
    const userId = getUserIdByToken(Authorization)

    const { stream, filename, mimetype, encoding } = await args.file;

    const id = shortId.generate();
    const img_path = `${path.join(__dirname, "../../prisma/uploads/images")}/${id}-${filename}`;

    await new Promise((resolve, reject) =>
        stream
            .pipe(createWriteStream(img_path))
            .on("finish", () => resolve({ id, img_path }))
            .on("error", reject)
    );

    const newfile = await context.prisma.file.create({
        data: {
            name: `images/${id}-${filename}`,
            mimetype: mimetype,
            encoding: encoding,
            uploadedBy: { connect: { id:userId } }
        }
    })

    newfile.uploadedBy = context.prisma.user.findUnique({ where: { id: userId } })
    return newfile;
}

async function putAlarms (parent, args, context) {
    /**
     * Alarm을 생성하는 함수
     * @param args.text
     */
    const Authorization = context.request.get("Authorization");
    const userId = getUserIdByToken(Authorization)

    const alarms = await context.prisma.alarm.create({
        data: {
            text: args.text,
            read: false,
            owner: { connect: { id: userId } }
        }
    })
    alarms.owner = context.prisma.user.findUnique({ where: { id: userId } })

    return alarms
}

async function readAlarm (parent, args, context) {
    /**
     * Alarm을 읽음 처리하는 함수
     * @param args.id
     */
    const Authorization = context.request.get("Authorization");
    const userId = getUserIdByToken(Authorization)

    const alarms = await context.prisma.alarm.update({
        where: {
            id: args.id
        },
        data: {
            read: true
        },
    })
    alarms.owner = context.prisma.user.findUnique({ where: { id: userId } })

    return alarms
}

async function uploadStuff(parent, args, context, info) {
    /**
     * title의 물건을 생성하는 함수
     * @param args.title (String!)
     * @param args.imageUrl (String)
     * @param args.qrcodeUrl (String!)
     */
    const Authorization = context.request.get("Authorization");
    const userId = getUserIdByToken(Authorization)
    const newStuff = await context.prisma.stuff.create({
        data: {
            title: args.title,
            postedBy: { connect: {id:userId} },
            imageUrl: args.imageUrl,
            qrcodeUrl: args.qrcodeUrl
        }
    })
    newStuff.postedBy = context.prisma.user.findUnique({ where: { id: newStuff.postedById } })
    return newStuff
}

async function updateOwnedToFinding(parent, args, context, info) {
    /**
     * 물건의 상태를 Owned에서 Finding으로 바꿔주는 함수.
     * @param args.id (Int!) 물건 id
     * @param args.location (String!) 분실위치
     * @param args.reward (Int!) 사례금
     */
    const stuff = await context.prisma.stuff.findUnique({
        where: {
            id: args.id
        }
    })
    if (!stuff) {
        throw new Error("Can not found stuff");
    }
    if (stuff.status !== "Owned"){
        throw new Error("Only apply status === 'Owned'")
    }

    const updatedStuffStatus = await context.prisma.stuff.update({
        where: {
            id: args.id
        },
        data: {
            status: "Finding",
            location: args.location,
            reward: args.reward
        },
    })

    updatedStuffStatus.postedBy = context.prisma.user.findUnique({ where: { id: updatedStuffStatus.postedById } })
    return updatedStuffStatus
}

async function updateFindingToOwned(parent, args, context, info) {
    /**
     * 물건의 상태를 Finding에서 Owned로 바꿔주는 함수.
     * @param args.id (Int!) 물건 id
     */
    const stuff = await context.prisma.stuff.findUnique({
        where: {
            id: args.id
        }
    })
    if (!stuff) {
        throw new Error("Can not found stuff");
    }
    if (stuff.status !== "Finding"){
        throw new Error("Only apply status === 'Finding'")
    }

    const updatedStuffStatus = await context.prisma.stuff.update({
        where: {
            id: args.id
        },
        data: {
            status: "Owned",
            location: "",
            reward: 0,
        },
    })

    updatedStuffStatus.postedBy = context.prisma.user.findUnique({ where: { id: updatedStuffStatus.postedById } })
    return updatedStuffStatus
}

async function updateFindingToCommunicating(parent, args, context, info) {
    /**
     * 물건의 상태를 Finding에서 Communicating으로 바꿔주는 함수.
     * @param args.id (Int!) 물건 id
     * @param args.acquirerId (Int!) 습득자의 user id
     */
    const stuff = await context.prisma.stuff.findUnique({
        where: {
            id: args.id
        }
    })
    if (!stuff) {
        throw new Error("Can not found stuff");
    }
    if (stuff.status !== "Finding"){
        throw new Error("Only apply status === 'Finding'")
    }

    const acquirer = await context.prisma.user.findUnique({ where: { id: args.acquirerId } })
    if (!acquirer){
        throw new Error("Can not found acquirer UserId")
    }
    if (args.acquirerId === stuff.postedById){
        throw new Error("AcquireId and stuff.postedById are must be different")
    }

    const updatedStuffStatus = await context.prisma.stuff.update({
        where: {
            id: args.id
        },
        data: {
            status: "Communicating",
            acquirerId: args.acquirerId
        },
    })

    updatedStuffStatus.postedBy = context.prisma.user.findUnique({ where: { id: updatedStuffStatus.postedById } })
    return updatedStuffStatus
}

async function updateCommunicatingToFinding(parent, args, context, info) {
    /**
     * 물건의 상태를 Communicating에서 Finding로 바꿔주는 함수.
     * @param args.id (Int!) 물건 id
     */
    const stuff = await context.prisma.stuff.findUnique({
        where: {
            id: args.id
        }
    })
    if (!stuff) {
        throw new Error("Can not found stuff");
    }
    if (stuff.status !== "Communicating"){
        throw new Error("Only apply status === 'Communicating'")
    }

    const updatedStuffStatus = await context.prisma.stuff.update({
        where: {
            id: args.id
        },
        data: {
            status: "Finding",
            acquirerId: -1
        },
    })

    updatedStuffStatus.postedBy = context.prisma.user.findUnique({ where: { id: updatedStuffStatus.postedById } })
    return updatedStuffStatus
}

async function updateCommunicatingToOwned(parent, args, context, info) {
    /**
     * 물건의 상태를 Communicating에서 Owned로 바꿔주는 함수.
     * @param args.id (Int!) 물건 id
     */
    const stuff = await context.prisma.stuff.findUnique({
        where: {
            id: args.id
        }
    })
    if (!stuff) {
        throw new Error("Can not found stuff");
    }
    if (stuff.status !== "Communicating"){
        throw new Error("Only apply status === 'Communicating'")
    }

    const updatedStuffStatus = await context.prisma.stuff.update({
        where: {
            id: args.id
        },
        data: {
            status: "Owned",
            location: "",
            reward: 0,
            acquirerId: -1
        },
    })

    updatedStuffStatus.postedBy = context.prisma.user.findUnique({ where: { id: updatedStuffStatus.postedById } })
    return updatedStuffStatus
}

async function deleteOwned(parent, args, context, info) {
    /**
     * 물건의 상태를 Owned인 물건을 삭제하는 함수
     * @param args.id (Int!) 물건 id
     */

    const stuff = await context.prisma.stuff.findUnique({
        where: {
            id: args.id
        }
    })
    if (!stuff){
        throw new Error("Can not found stuff.")
    }
    const Authorization = context.request.get("Authorization");
    const userId = getUserIdByToken(Authorization)
    if (userId !== stuff.postedById) {
        throw new Error("You don't have delete permission.")
    }

    const deletedStuff = await context.prisma.stuff.delete({
        where: {
            id: args.id
        }
    })

    return deletedStuff
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
    updatedStuffLocation.postedBy = context.prisma.user.findUnique({ where: { id: updatedStuffLocation.postedById } })
    return updatedStuffLocation
}

async function updateStuffReward(parent, args, context, info) {
    /**
     * 물건의 사례금을 변경해주는 함수
     * @param args.id (Int!) 물건 id
     * @param args.reward (Int!)
     */
    if (args.reward < 0){
        throw new Error("Reward must be greater than zero")
    }
    const updatedStuff = await context.prisma.stuff.update({
        where: {
            id: args.id
        },
        data: {
            reward: args.reward
        },
    })
    updatedStuff.postedBy = context.prisma.user.findUnique({ where: { id: updatedStuff.postedById } })
    return updatedStuff
}

async function createMessage (parent, args, context) {
    /**
     * 채팅방 생성 함수
     * @param args.targetUserId: Int!
     * @param args.stuffId: Int!
     */

    // 본인과 상대방의 유저 정보를 가져옴
    const Authorization = context.request.get("Authorization");
    const hostUserId = getUserIdByToken(Authorization)

    const host = await context.prisma.user.findUnique({where: {id: hostUserId}})
    const participant = await context.prisma.user.findUnique({
        where: {id: args.targetUserId}
    })

    // 물건정보를 가져옴
    const stuffInfo = await context.prisma.stuff.findUnique({
            where: {id: args.stuffId}
        }
    )

    // 물건 유저 예외처리
    if (!stuffInfo){
        throw new Error('No such stuff found')
    }
    if (!host) {
        throw new Error('No such user found')
    }
    if (!participant) {
        throw new Error('No such target user found')
    }

    // host와 참가자를 relation으로 연결하고, 물건ID를 등록함
    const chat = await context.prisma.chat.create({
        data: {
            host: { connect: { id : hostUserId }},
            participant: { connect: { id : args.targetUserId }},
            stuffId: args.stuffId,
        }
    })

    chat.host = context.prisma.user.findUnique({ where: { id: chat.hostId } })
    chat.participant = context.prisma.user.findUnique({ where: { id: chat.participantId } })
    chat.messages = []

    return chat
}

async function sendMessage (parent, args, context) {
    /**
     * 생성된 채팅방에 메시지 보내기
     * @param args.chatId: Int!
     * @param args.text: String!
     */

    // 본인의 유저정보를 받아옴
    const Authorization = context.request.get("Authorization");
    const userId = getUserIdByToken(Authorization)
    if (!userId) {
        throw new Error('No such user found')
    }

    // 채팅ID를 통해 채팅정보를 받아옴
    var chatInfo = await context.prisma.chat.findUnique({where: {id: args.chatId}})

    if (!chatInfo) {
        throw new Error('Chat not found, wrong chatId.')
    }

    // 해당 채팅에 host로 되어있는지, 참가자로 되어있는지를 판별함
    var isParticipant = false
    var isHost = false

    if (chatInfo.participantId === userId){
        isParticipant = true
    }else {
        if (chatInfo.hostId === userId) {
            isHost = true
        } else {
            throw new Error('There is no matching user between host and participant.')
        }
    }

    const NOW = new Date()

    // message 생성. text와 fromUserId, createdAt을 만들고, 채팅과 relation으로 연결함
    const message = await context.prisma.message.create({
        data: {
            text: args.text,
            fromUserId: userId,
            chat: { connect: { id : args.chatId }},
            createdAt: NOW,
        }
    })
    // owner: { connect: { id: userId } }
    // alarms.owner = context.prisma.user.findUnique({ where: { id: userId } })
    // return할 message의 chat 가져오고, host와 participant정보도 추가함
    const chat = await context.prisma.chat.findUnique({where: {id: message.chatId}})

    chat.host = context.prisma.user.findUnique({ where: { id: chat.hostId } })
    chat.participant = context.prisma.user.findUnique({ where: { id: chat.participantId } })

    // relation으로 연결되어있지만, return을 위해 chat을 연결시켜서 보여줌
    message.chat = chat

    // 해당 유저가 참가자인지, host인지를 판별한 후에, 마지막접속시간을 수정함
    if (isParticipant) {
        const chatInfo = await context.prisma.chat.update({
            where: {
                id: args.chatId
            },
            data: {
                lastConnectParti: NOW
            },
        })
    }else {
        if (isHost) {
            const chatInfo = await context.prisma.chat.update({
                where: {
                    id: args.chatId
                },
                data: {
                    lastConnectHost: NOW
                },
            })
        }
    }

    // 생성한 메시지를 return (message의 chat의 message는 null로 보임)
    return message
}

module.exports = {
    signup,
    login,

    putAlarms,
    readAlarm,

    tradingReward,
    updateMyLocation,
    updateMyImageurl,

    uploadStuff,
    updateOwnedToFinding,
    updateFindingToOwned,
    updateFindingToCommunicating,
    updateCommunicatingToFinding,
    updateCommunicatingToOwned,
    deleteOwned,
    updateStuffReward,
    updateStuffLocation,

    singleUpload,
    createMessage,
    sendMessage
}