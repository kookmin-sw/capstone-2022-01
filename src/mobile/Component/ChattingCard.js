import React from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";
import { Badge, Card, Flex } from "@ant-design/react-native";
import Icon from "react-native-vector-icons/Ionicons";

export default class ChattingCard extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <TouchableOpacity
        onPress={() =>
          this.props.navigation.navigate("Chatting", {
            chatting: this.props.chatting,
          })
        }
      >
        <Card style={styles.chattingCard}>
          <Card.Body style={styles.chattingCardContent}>
            <Flex>
              <Flex.Item flex={1}>
                {this.props.opponentImage == null ? (
                  <Icon
                    name="person-circle-outline"
                    size={70}
                    style={styles.icon}
                  />
                ) : (
                  <Image source={this.props.opponentImage} />
                )}
              </Flex.Item>
              <Flex.Item flex={2}>
                <Flex direction="column" align="start">
                  <Flex.Item>
                    <View style={{ display: "flex", flexDirection: "row" }}>
                      <Text style={styles.opponentName}>
                        {this.props.chatting.opponentName}
                      </Text>
                      {this.props.chatting.unreadNum > 0 ? (
                        <Badge
                          style={{ marginLeft: 17, marginTop: 10 }}
                          text={this.props.chatting.unreadNum}
                        />
                      ) : (
                        <View />
                      )}
                    </View>
                  </Flex.Item>
                  <Flex.Item>
                    <Text style={styles.lastChatting}>
                      {this.props.chatting.lastChatting}
                    </Text>
                  </Flex.Item>
                </Flex>
              </Flex.Item>
              <Flex.Item flex={1}>
                <Image
                  source={this.props.chatting.item.image}
                  style={styles.itemImage}
                />
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
  itemImage: {
    width: 70,
    height: 70,
    borderRadius: 7,
    overflow: "hidden",
    marginTop: 5,
  },
  opponentName: {
    fontSize: 20,
  },
  lastChatting: {
    marginTop: 10,
    color: "#444444",
  },
});
