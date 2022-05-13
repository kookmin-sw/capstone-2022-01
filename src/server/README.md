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
    http://52.79.153.136:4000/


## 6. Get Images

    localhost:4000/FILENAME
    # FILENAME : type File의 name. 

## 6. Get QRCodes

    localhost:4000/FILENAME
    # FILENAME : type Stuff의 qrcodeUrl. 
    QRCode의 내용은 stuffId가 들어감

## 7. 테스트 가능한 schema
    
    capstone-2022-01/src/server/src/schema.graphql을 참고하세요.
