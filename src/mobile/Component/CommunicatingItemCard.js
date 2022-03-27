import React from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import { Card, Flex, Button } from "@ant-design/react-native";

export default class CommunicatingItemCard extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Card style={styles.itemCard}>
        <Card.Body style={styles.itemCardContent}>
          <Flex>
            <Flex.Item flex={1}>
              <Image source={this.props.item.image} style={styles.itemImage} />
            </Flex.Item>
            <Flex.Item flex={2}>
              <View>
                <Flex direction="column" style={styles.itemInfo} align="start">
                  <Flex.Item>
                    <Text style={styles.itemName}>
                      {this.props.item.itemName}
                    </Text>
                  </Flex.Item>
                  <Flex.Item>
                    <View style={styles.row}>
                      <Text style={styles.location}>
                        {this.props.item.location} 추정
                      </Text>
                      <Button size="small">변경</Button>
                    </View>
                  </Flex.Item>
                  <Flex.Item>
                    <View style={styles.row}>
                      <Text style={styles.reward}>
                        {"보상금 " +
                          this.props.item.reward
                            .toString()
                            .replace(/\B(?=(\d{3})+(?!\d))/g, ",") +
                          " 원"}
                      </Text>
                      <Button size="small">변경</Button>
                    </View>
                  </Flex.Item>
                  <Flex.Item>
                    <Text style={styles.reward}>
                      {this.props.item.opponentName + "님과 대화중"}
                    </Text>
                  </Flex.Item>
                </Flex>
              </View>
            </Flex.Item>
          </Flex>
        </Card.Body>
      </Card>
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
