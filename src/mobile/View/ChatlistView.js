import React from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import Header from "../Component/Header";
import Footer from "../Component/Footer";
import ChattingCard from "../Component/ChattingCard";

export default class ChatlistView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      chattings: [
        {
          opponentName: "김진우",
          opponentImage: null,
          unreadNum: 4,
          item: {
            image: require("../assets/dummy_data/tumbler.jpeg"),
            itemName: "스타벅스 텀블러",
            location: "정릉동",
            reward: 5000,
            opponentName: "김진우",
          },
          lastChatting: "어디 계신가요?",
          messages: [
            {
              _id: 1,
              text: "스타벅스 텀블러 찾았습니다!!",
              createdAt: new Date(2022, 2, 26, 14, 20, 0),
              user: {
                _id: 2,
                name: "김진우",
                avatar:
                  "https://user-images.githubusercontent.com/28584063/159915056-9732a9e7-44e2-452a-9f84-bc121c45a1ad.jpeg",
              },
            },
            {
              _id: 2,
              text: "정말 감사합니다 ㅠㅠ",
              createdAt: new Date(2022, 2, 26, 14, 20, 20),
              user: {
                _id: 1,
                name: "김성식",
                avatar: "https://placeimg.com/140/140/any",
              },
            },
            {
              _id: 3,
              text: "오늘 저녁 6시에 국민대 정문에서 뵐까요?",
              createdAt: new Date(2022, 2, 26, 14, 20, 40),
              user: {
                _id: 2,
                name: "김진우",
                avatar:
                  "https://user-images.githubusercontent.com/28584063/159915056-9732a9e7-44e2-452a-9f84-bc121c45a1ad.jpeg",
              },
            },
            {
              _id: 4,
              text: "네 알겠습니다 ㅎㅎㅎ",
              createdAt: new Date(2022, 2, 26, 14, 21, 0),
              user: {
                _id: 1,
                name: "김성식",
                avatar: "https://placeimg.com/140/140/any",
              },
            },
            {
              _id: 5,
              text: "어디 계신가요?",
              createdAt: new Date(2022, 2, 26, 17, 59, 0),
              user: {
                _id: 2,
                name: "김진우",
                avatar:
                  "https://user-images.githubusercontent.com/28584063/159915056-9732a9e7-44e2-452a-9f84-bc121c45a1ad.jpeg",
              },
            },
          ],
        },
      ],
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <Header isHome={true} />
        <ScrollView>
          {this.state.chattings.map((chatting, index) => {
            return (
              <ChattingCard
                chatting={chatting}
                key={index}
                navigation={this.props.navigation}
              />
            );
          })}
        </ScrollView>
        <Footer navigation={this.props.navigation} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    height: "100%",
  },
});
