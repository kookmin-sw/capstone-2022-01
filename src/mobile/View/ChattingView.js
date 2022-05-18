import React from "react";
import { StyleSheet, View } from "react-native";
import Header from "../Component/Header";
import CommunicatingItemCard from "../Component/CommunicatingItemCard";
import { GiftedChat } from "react-native-gifted-chat";

export default class ChattingView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      chatting: this.props.navigation.getParam("chatting", null),
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <Header
          isHome={false}
          navigation={this.props.navigation}
          destination={"Chatlist"}
        />
        <CommunicatingItemCard item={this.state.chatting.item} />
        <GiftedChat
          messages={this.state.chatting.messages}
          user={{ _id: 1 }}
          inverted={false}
          onSend={() => {}}
        />
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
