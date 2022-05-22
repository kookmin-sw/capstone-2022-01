import React from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import { defaultFontText as Text } from "./Text";
import { Card, Modal } from "@ant-design/react-native";
import CreateChattingButton from "./CreateChattingButton";

export default class ItemCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      item: props.item,
      modalVisible: false,
    };
  }

  render() {
    return (
      <View>
        <TouchableOpacity onPress={() => this.setState({ modalVisible: true })}>
          <Card style={styles.alarmCard}>
            <Card.Body style={styles.alarmCardContent}>
              <Text>{this.props.alarm.text}</Text>
            </Card.Body>
          </Card>
        </TouchableOpacity>
        <Modal
          visible={this.state.modalVisible}
          onClose={() => this.setState({ modalVisible: false })}
          transparent
          closable
          maskClosable
          style={{
            alignItem: "center",
            justifyContent: "center",
          }}
        >
          <Text style={styles.modalText}>{this.props.alarm.text}</Text>
          <CreateChattingButton
            targetUserId={this.props.alarm.owner.id}
            stuffId={this.props.alarm.stuffId}
            finishCreateChatting={() => this.setState({ modalVisible: false })}
          />
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    height: "100%",
  },
  alarmCard: {
    marginLeft: 10,
    marginRight: 10,
    marginTop: 5,
    marginBottom: 5,
    borderBottomWidth: 1,
    borderWidth: 0,
  },
  alarmCardContent: {
    borderTopWidth: 0,
    borderBottomWidth: 0,
    marginLeft: 10,
    justifyContent: "center",
  },
  modalText: {
    width: "90%",
    marginTop: 30,
    alignSelf: "center",
    fontSize: 20,
  },
});
