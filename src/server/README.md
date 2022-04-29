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
    
    node /src/index.js


## 5. Playground

    localhost:4000/graphql


## Schema : src/schema.graphql
```text
type Query {
    getFile(id: Int!): File
    getFiles: [File]

    getMyProfile: User
    getUserProfile(userid: Int!): User
    getMyStuff: [Stuff]
    getMyStuffStatus(status: String!): [Stuff]
    getStuffByLocation(location: String!): [Stuff]
}

type Mutation {
    singleUpload(file: Upload!): File!
    signup(email: String!, password: String!, name: String!, location: String!): AuthPayload
    login(email: String!, password: String!): AuthPayload
    updateUserLocation(location: String!): User
    uploadStuff(title: String!): Stuff
    updateStuffStatus(id: Int!, status: String!): Stuff
    updateStuffReward(id: Int!, reward: Int!): Stuff
    updateStuffLocation(id: Int!, location: String!): Stuff
}
```
