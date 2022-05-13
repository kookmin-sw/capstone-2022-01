# Server

## 1. Git clone

    git clone https://github.com/kookmin-sw/capstone-2022-01.git

## 2. Install all dependency packages

    cd capstone-2022-01/src/server/
    npm install

## 3. Prisma build

    npx prisma migrate dev --name "demo"
    npx prisma generate	

## 4. Server start
    
    node ./src/index.js


## 5. Playground

    localhost:4000


## 6. Get Images

    localhost:4000/FILENAME
    # FILENAME : type File의 name. 


## 테스트 가능한 schema
```text
type Query {
    getMyProfile: User                                                                        # 내 프로필
    getUserProfile(userid: Int!): User                                                        # 특정 유저의 프로필
    
    getFile(id: Int!): File                                                                   # 특정 File
    getFiles: [File]                                                                          # 모든 File
    
    getMyAlarms: [Alarm]                                                                      # 나에게 등록된 알림들
    
    getMyStuff: [Stuff]                                                                       # 내가 등록한 물건들
    getMyStuffByStatus(status: String!): [Stuff]                                              # 내가 등록한 상태별 물건들
    getStuffByLocation(location: String!): [Stuff]                                            # 지역별 분실물들
    getStuffById(id: Int!): Stuff                                                             # 특정 물건정보
    
    getMyHostChats: [Chat]                                                                    # 생성한 채팅방들(안써도댐)
    getMyJoinChats: [Chat]                                                                    # 초대된 채팅방들(안써도댐)
    getMyChats: [Chat]                                                                        # 내가 참여하는 채팅방들
    getChat(id: Int!): Chat                                                                   # 특정 채팅방 조회
}

type Mutation {
    signup(email: String!, password: String!, name: String!, location: String!): AuthPayload  # 회원가입
    login(email: String!, password: String!): AuthPayload                                     # 로그인
    
    putAlarms(text: String!): Alarm                                                           # 알림 등록
    readAlarm(id: Int!): Alarm                                                                # 알림 읽음 처리
  
    tradingReward(userid: Int!, amount: Int!): User                                           # 사례금 전달
    updateMyLocation(location: String!): User                                                 # 내 location 수정
    updateMyImageurl(imageUrl: String!): User                                                 # 내 imageUrl 수정
    
    uploadStuff(title: String!): Stuff                                                        # 물건등록
    updateStuffStatus(id: Int!, status: String!): Stuff                                       # 물건상태 변경
    updateStuffReward(id: Int!, reward: Int!): Stuff                                          # 물건사례금 변경
    updateStuffLocation(id: Int!, location: String!): Stuff                                   # 물건 분실위치 변경
    
    uploadStuff(title: String!, qrcodeUrl: String!, imageUrl: String): Stuff                  # 물건등록
    updateOwnedToFinding(id: Int!, location: String!, reward: Int!): Stuff                    # 물건상태 변경 
    updateFindingToOwned(id: Int!): Stuff                                                     # 물건상태 변경  
    updateFindingToCommunicating(id: Int!, acquirerId: Int!): Stuff                           # 물건상태 변경  
    updateCommunicatingToFinding(id: Int!): Stuff                                             # 물건상태 변경
    updateCommunicatingToOwned(id: Int!): Stuff                                               # 물건상태 변경
    deleteOwned(id: Int!): Stuff                                                              # 내 소유 물건삭제
    
    updateStuffReward(id: Int!, reward: Int!): Stuff
    updateStuffLocation(id: Int!, location: String!): Stuff
    singleUpload(file: Upload!): File!                                                        # 이미지 업로드
    
    createMessage(targetUserId: Int!, stuffId: Int!): Chat                                    # 채팅방 생성
    sendMessage(chatId: Int!, text: String!): Message                                         # 채팅방에 메시지 전송
}
```
