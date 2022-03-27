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
          },
          lastChatting: "어디 계신가요?",
          chattings: [
            {
              name: "김진우",
              message: "스타벅스 텀블러 찾았습니다!!",
            },
            {
              name: "김성식",
              message: "정말 감사합니다 ㅠㅠ",
            },
            {
              name: "김진우",
              message: "오늘 저녁 6시에 국민대 정문에서 뵐까요?",
            },
            {
              name: "김성식",
              message: "네 알겠습니다.",
            },
            {
              name: "김진우",
              message: "어디 계신가요?",
            },
          ],
        },
      ],
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <Header />
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
