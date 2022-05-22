import React from "react";
import { StyleSheet, View, Image, TouchableOpacity } from "react-native";
import { defaultFontText as Text } from "./Text";
import { Badge, Card, Flex } from "@ant-design/react-native";
import Icon from "react-native-vector-icons/Ionicons";
import ChattingThumbnail from "./ChattingThumbnail";

export default class ChattingCard extends React.Component {
  constructor(props) {
    super(props);
    let lastChatting = "";
    if (this.props.chatting.messages.length > 0) {
      lastChatting =
        this.props.chatting.messages[this.props.chatting.messages.length - 1]
          .text;
    }
    let isHost = this.props.userId === this.props.chatting.host.id;
    let lastConnectTime = isHost
      ? this.props.chatting.lastConnectHost
      : this.props.chatting.lastConnectParti;
    let unreadNum = 0;
    for (let message of this.props.chatting.messages.reverse()) {
      if (lastConnectTime > message.createdAt) {
        break;
      } else {
        unreadNum += 1;
      }
    }
    this.state = {
      lastChatting: lastChatting,
      isHost: isHost,
      opponentImage: isHost
        ? this.props.chatting.participant.imageUrl
        : this.props.chatting.host.imageUrl,
      opponentName: isHost
        ? this.props.chatting.participant.name
        : this.props.chatting.host.name,
      unreadNum: unreadNum,
    };
  }

  render() {
    return (
      <TouchableOpacity
        onPress={() => {
          this.props.navigation.navigate("Chatting", {
            id: this.props.chatting.id,
            userId: this.props.userId,
            chattingRefetch: this.props.refetch,
          });
        }}
      >
        <Card style={styles.chattingCard}>
          <Card.Body style={styles.chattingCardContent}>
            <Flex>
              <Flex.Item flex={1}>
                {this.state.opponentImage === "" ? (
                  <Icon
                    name="person-circle-outline"
                    size={70}
                    style={styles.icon}
                  />
                ) : (
                  <Image source={{ uri: this.state.opponentImage }} />
                )}
              </Flex.Item>
              <Flex.Item flex={2}>
                <Flex direction="column" align="start">
                  <Flex.Item>
                    <View style={{ display: "flex", flexDirection: "row" }}>
                      <Text style={styles.opponentName}>
                        {this.state.opponentName}
                      </Text>
                      {this.state.unreadNum > 0 ? (
                        <Badge
                          style={{ marginLeft: 17, marginTop: 10 }}
                          text={this.state.unreadNum}
                        />
                      ) : (
                        <View />
                      )}
                    </View>
                  </Flex.Item>
                  <Flex.Item>
                    <Text style={styles.lastChatting}>
                      {this.state.lastChatting}
                    </Text>
                  </Flex.Item>
                </Flex>
              </Flex.Item>
              <Flex.Item flex={1}>
                <ChattingThumbnail id={this.props.chatting.stuffId} />
              </Flex.Item>
            </Flex>
          </Card.Body>
        </Card>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    width: "100%",
  },
  chattingCard: {
    borderWidth: 0,
  },
  chattingCardContent: {
    borderTopWidth: 0,
    borderBottomWidth: 0.5,
  },
  icon: {
    width: 70,
    height: 70,
    borderRadius: 7,
    overflow: "hidden",
    color: "grey",
    marginLeft: 10,
  },
  opponentName: {
    fontSize: 20,
  },
  lastChatting: {
    marginTop: 10,
    color: "#444444",
  },
});
