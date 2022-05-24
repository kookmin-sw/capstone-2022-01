# Using Git

### git clone

    git clone https://github.com/kookmin-sw/capstone-2022-01.git

### Install all dependency packages

    cd capstone-2022-01/src/server/
    npm install

### Prisma build

    npx prisma migrate dev --name "demo"
    npx prisma generate	

### Server start
    
    node ./src/index.js


### Playground

    localhost:4000
    http://52.79.153.136:4000/


# Using Dockerfile

### Dockerfile
```dockerfile
FROM ubuntu:latest
  
RUN apt-get update
RUN apt-get install -y git
RUN apt-get install -y nodejs
RUN apt-get install -y npm
RUN git clone https://github.com/kookmin-sw/capstone-2022-01.git

RUN cd capstone-2022-01/src/server/
WORKDIR capstone-2022-01/src/server
RUN npm install

RUN npx prisma migrate dev --name "canary"
RUN npx prisma generate

EXPOSE 4000

ENTRYPOINT node ./src/index.js
```

### docker build

```text
docker build -f Dockerfile -t capstone01:canary .
```

### docker run

```text
docker run -itd --ipc=host -p 4000:4000 --name capstone-server capstone01:canary
```
