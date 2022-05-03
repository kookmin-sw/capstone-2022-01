const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { APP_SECRET, getUserIdByToken } = require('../utils')

const path = require("path");
const { createWriteStream } = require("fs");

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
     * @param args.userid (Int!) 상대 유저의 id
     * @param args.amount (Int!) 상대에게 전달할 금액
     * return 상대 user의 profile
     * */
    if (args.amount <= 0) {
        throw new Error("The amount must be greater than zero")
    }
    const targetProfile = await context.prisma.user.findUnique({ where: { id: args.userid} })
    const myProfile = await context.prisma.user.findUnique({ where: { id: context.userId } })

    if (!myProfile || !targetProfile) {
        throw new Error('No such user found')
    }

    if (myProfile.point < args.amount) {
        throw new Error('Not have enough money')
    }

    const updatedTargetPoint = await context.prisma.user.update({
        where: {
            id: args.userid
        },
        data: {
            point: targetProfile.point + args.amount
        },
    })
    const updatedMyPoint = await context.prisma.user.update({
        where: {
            id: context.userId
        },
        data: {
            point: myProfile.point - args.amount
        },
    })
    return updatedTargetPoint
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
    newStuff.postedBy = context.prisma.user.findUnique({ where: { id: newStuff.postedById } })
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

    updatedStuffStatus.postedBy = context.prisma.user.findUnique({ where: { id: updatedStuffStatus.postedById } })
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
    updatedStuffLocation.postedBy = context.prisma.user.findUnique({ where: { id: updatedStuffLocation.postedById } })
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
    updatedStuff.postedBy = context.prisma.user.findUnique({ where: { id: updatedStuff.postedById } })
    return updatedStuff
}

async function singleUpload (parent, args, context) {
    /**
     * Image Upload 함수
     * @param args.file
     */
    const userId = getUserIdByToken(context.token)

    const { createReadStream, filename, mimetype, encoding } = await args.file;

    const newfile = await context.prisma.file.create({
        data: {
            name: filename,
            mimetype: mimetype,
            encoding: encoding,
            uploadedBy: { connect: { id:userId } }
        }
    })

    await new Promise((res) =>
        createReadStream()
            .pipe(
                createWriteStream(
                    path.join(__dirname, "../../prisma/uploads/images", filename)
                )
            )
            .on("close", res)
    );

    return newfile;
}

async function putAlarms (parent, args, context) {
    /**
     * Alarm을 생성하는 함수
     * @param args.text
     */
    const alarms = await context.prisma.alarm.create({
        data: {
            text: args.text,
            read: false,
            owner: { connect: { id:context.userId } }
        }
    })
    alarms.owner = context.prisma.user.findUnique({ where: { id: context.userId } })

    return alarms
}

async function readAlarm (parent, args, context) {
    /**
     * Alarm을 읽음 처리하는 함수
     * @param args.id
     */
    const alarms = await context.prisma.alarm.update({
        where: {
            id: args.id
        },
        data: {
            read: true
        },
    })
    alarms.owner = context.prisma.user.findUnique({ where: { id: context.userId } })

    return alarms
}


module.exports = {
    signup,
    login,
    tradingReward,
    updateUserLocation,
    putAlarms,
    readAlarm,
    uploadStuff,
    updateStuffStatus,
    updateStuffReward,
    updateStuffLocation,
    singleUpload
}