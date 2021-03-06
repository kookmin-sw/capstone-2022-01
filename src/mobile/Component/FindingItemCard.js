import React from "react";
import { StyleSheet, View, Image, TouchableOpacity } from "react-native";
import { defaultFontText as Text } from "./Text";
import { Card, Flex, Button } from "@ant-design/react-native";
import FindingToOwnedButton from "./FindingToOwnedButton";
import Icon from "react-native-vector-icons/Ionicons";
import QRcodeImageModal from "./QRcodeImageModal";

export default class FindingItemCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      qrModalVisible: false,
    };
    this.finishFindingToOwned = this.finishFindingToOwned.bind(this);
  }

  finishFindingToOwned() {
    this.props.refetch();
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
                      <View style={styles.row}>
                        <Text style={styles.location}>
                          {this.props.item.location.split(",")[2]} 추정
                        </Text>
                        <Button size="small">변경</Button>
                      </View>
                    </Flex.Item>
                    <Flex.Item>
                      <View style={styles.row}>
                        <Text style={styles.reward}>
                          {"사례금 " +
                            this.props.item.reward
                              .toString()
                              .replace(/\B(?=(\d{3})+(?!\d))/g, ",") +
                            " 원"}
                        </Text>
                        <Button size="small">변경</Button>
                      </View>
                    </Flex.Item>
                    <Flex.Item>
                      <FindingToOwnedButton
                        id={this.props.item.id}
                        finishFindingToOwned={this.finishFindingToOwned}
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
    height: 130,
  },
  itemName: {
    marginTop: 5,
    fontSize: 18,
  },
  location: {
    marginTop: 3,
    color: "grey",
    marginRight: 10,
  },
  reward: {
    marginTop: 2,
    fontSize: 14,
    marginRight: 10,
  },
  row: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
});
