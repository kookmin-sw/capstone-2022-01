## Mobile application

* 사용법

```shell
git clone https://github.com/kookmin-sw/capstone-2022-01.git
```
```shell
cd src/mobile/
```
```shell
npm install
```
```shell
expo start
```

* font 관련 에러 발생

```shell
expo install expo-font
```

  * 위의 명령어 입력 시 node version이 맞지 않을 경우 에러 메세지에 나오는 node version으로 변경
  ```shell
  nvm install [node version]
  nvm use [node version]
  ```

### 개인 스마트폰 사용
1. Expo Go application 다운로드
2. expo start 명령어 입력 후 나오는 페이지에서 QR코드 스캔

### Mac OS에서 iOS Simulator 사용
1. Xcode 설치
2. expo start --ios로 실행 (혹은 expo start 명령어 입력 후 i 입력)


