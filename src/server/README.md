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


## 0503기준 테스트 가능한 schema
```text
type Query {
    getMyProfile: User
}

type Mutation {
    signup(email: String!, password: String!, name: String!, location: String!): AuthPayload
    login(email: String!, password: String!): AuthPayload
}
```
