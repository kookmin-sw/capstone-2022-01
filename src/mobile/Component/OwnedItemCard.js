import React from "react";
import { StyleSheet, View, Image, TouchableOpacity } from "react-native";
import { defaultFontText as Text } from "./Text";
import { Card, Flex, Button, Modal, InputItem } from "@ant-design/react-native";
import DeleteOwnedItemButton from "./DeleteOwnedItemButton";
import OwnedToFindingButton from "./OwnedToFindingButton";
import location from "../assets/location.json";
import ModalDropdown from "react-native-modal-dropdown";
import Icon from "react-native-vector-icons/Ionicons";
import QRcodeImageModal from "./QRcodeImageModal";

export default class OwnedItemCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      item: props.item,
      modalVisible: false,
      group1: [],
      group2: [],
      group3: [],
      selected1: null,
      selected2: null,
      selected3: null,
      reward: 0,
      qrModalVisible: false,
    };
    this.openModal = this.openModal.bind(this);
    this.onChangeGroup1 = this.onChangeGroup1.bind(this);
    this.onChangeGroup2 = this.onChangeGroup2.bind(this);
    this.onChangeGroup3 = this.onChangeGroup3.bind(this);
    this.getLocation = this.getLocation.bind(this);
    this.finishDelete = this.finishDelete.bind(this);
    this.finishOwnedToFinding = this.finishOwnedToFinding.bind(this);
  }

  finishDelete() {
    this.props.refetch();
  }

  finishOwnedToFinding() {
    this.props.refetch();
  }

  openModal() {
    this.setState({
      modalVisible: true,
    });
    let group1 = [];
    for (let idx1 in location) {
      group1.push(location[idx1]["시도"]);
    }
    this.setState({
      group1: group1,
    });
  }

  onChangeGroup1(idx) {
    this.setState({
      selected1: idx,
      selected2: null,
      selected3: null,
      group3: [],
    });
    let group1 = location[idx]["group1"];
    let group2 = [];
    for (let idx2 in group1) {
      group2.push(group1[idx2]["시군구"]);
    }
    this.setState({
      group2: group2,
    });
  }

  onChangeGroup2(idx) {
    this.setState({
      selected2: idx,
      selected3: null,
    });
    if (this.state.selected1 !== null) {
      let group2 = location[this.state.selected1]["group1"][idx]["group2"];
      let group3 = [];
      for (let idx2 in group2) {
        group3.push(group2[idx2]["읍면동"]);
      }
      this.setState({
        group3: group3,
      });
    }
  }

  onChangeGroup3(idx) {
    this.setState({
      selected3: idx,
    });
  }

  getLocation() {
    if (
      this.state.selected1 !== null &&
      this.state.selected2 !== null &&
      this.state.selected3 !== null
    ) {
      return (
        this.state.group1[this.state.selected1] +
        "," +
        this.state.group2[this.state.selected2] +
        "," +
        this.state.group3[this.state.selected3]
      );
    } else {
      return false;
    }
  }

  render() {
    return (
      <View>
        <Card style={styles.itemCard}>
          <Card.Body style={styles.itemCardContent}>
            <Flex>
              <Flex.Item flex={4}>
                <Image
                  source={{ uri: this.props.item.imageUrl }}
                  style={styles.itemImage}
                />
              </Flex.Item>
              <Flex.Item flex={6}>
                <View>
                  <Flex
                    direction="column"
                    style={styles.itemInfo}
                    align="start"
                  >
                    <Flex.Item>
                      <Text style={styles.itemName}>
                        {this.props.item.title}
                      </Text>
                    </Flex.Item>
                    <Flex.Item>
                      <Button size="small" onPress={this.openModal}>
                        분실 신고하기
                      </Button>
                    </Flex.Item>
                    <Flex.Item>
                      <DeleteOwnedItemButton
                        id={this.props.item.id}
                        finishDelete={this.finishDelete}
                      />
                    </Flex.Item>
                  </Flex>
                </View>
              </Flex.Item>
              <Flex.Item flex={1}>
                <TouchableOpacity
                  onPress={() => this.setState({ qrModalVisible: true })}
                >
                  <Icon name="qr-code" size={20} />
                </TouchableOpacity>
              </Flex.Item>
            </Flex>
          </Card.Body>
        </Card>
        <Modal
          visible={this.state.modalVisible}
          onClose={() => this.setState({ modalVisible: false })}
          title={"분실 신고"}
          transparent
          closable
          maskClosable
        >
          <Text style={styles.modalLabel}>분실 추정 위치 설정</Text>
          <ModalDropdown
            options={this.state.group1}
            onSelect={(selected) => this.onChangeGroup1(selected)}
            dropdownStyle={{
              width: "40%",
              marginLeft: "10%",
            }}
            dropdownTextStyle={{
              fontFamily: "Pretendard",
              fontSize: 15,
            }}
          >
            <View style={styles.dropdown}>
              <Text>
                {this.state.selected1 !== null
                  ? this.state.group1[this.state.selected1]
                  : "시/도"}
              </Text>
              <Text>↓</Text>
            </View>
          </ModalDropdown>
          <ModalDropdown
            options={this.state.group2}
            onSelect={(selected) => this.onChangeGroup2(selected)}
            dropdownStyle={{
              width: "40%",
              marginLeft: "10%",
            }}
            dropdownTextStyle={{
              fontFamily: "Pretendard",
              fontSize: 15,
            }}
          >
            <View style={styles.dropdown}>
              <Text>
                {this.state.selected2 !== null
                  ? this.state.group2[this.state.selected2]
                  : "시/군/구"}
              </Text>
              <Text>↓</Text>
            </View>
          </ModalDropdown>
          <ModalDropdown
            options={this.state.group3}
            onSelect={(selected) => this.onChangeGroup3(selected)}
            dropdownStyle={{
              width: "40%",
              marginLeft: "10%",
            }}
            dropdownTextStyle={{
              fontFamily: "Pretendard",
              fontSize: 15,
            }}
          >
            <View style={styles.dropdown}>
              <Text>
                {this.state.selected3 !== null
                  ? this.state.group3[this.state.selected3]
                  : "읍/면/동"}
              </Text>
              <Text>↓</Text>
            </View>
          </ModalDropdown>
          <Text style={styles.modalLabel}>사례금 설정</Text>
          <InputItem
            extra={"원"}
            onChange={(value) => {
              this.setState({ reward: parseInt(value) });
            }}
          />
          <OwnedToFindingButton
            id={this.props.item.id}
            location={this.getLocation()}
            reward={this.state.reward}
            finishOwnedToFinding={this.finishOwnedToFinding}
          />
        </Modal>
        <QRcodeImageModal
          qrModalVisible={this.state.qrModalVisible}
          closeQRModal={() => this.setState({ qrModalVisible: false })}
          qrcodeUrl={this.props.item.qrcodeUrl}
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
  itemCard: {
    borderWidth: 0,
  },
  itemCardContent: {
    borderTopWidth: 0,
    borderBottomWidth: 0.5,
  },
  itemImage: {
    width: 100,
    height: 100,
    borderRadius: 7,
    overflow: "hidden",
    marginTop: 5,
    marginLeft: 10,
  },
  itemInfo: {
    height: 100,
  },
  itemName: {
    marginTop: 5,
    fontSize: 18,
  },
  location: {
    marginTop: 3,
    color: "grey",
  },
  reward: {
    marginTop: 2,
    fontSize: 14,
  },
  dropdown: {
    marginTop: 20,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "70%",
    alignSelf: "center",
    borderBottomWidth: 1,
    borderBottomColor: "grey",
    paddingBottom: 10,
  },
  modalLabel: {
    fontSize: 17,
    marginTop: 30,
  },
});
