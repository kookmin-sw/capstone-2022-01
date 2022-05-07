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
    return updatedMyPoint
}

async function updateUserLocation(parent, args, context, info) {
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

module.exports = {
    signup,
    login,

    putAlarms,
    readAlarm,

    tradingReward,
    updateUserLocation,

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
}