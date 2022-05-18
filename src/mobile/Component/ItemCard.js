import React from "react";
import { StyleSheet, View, Image } from "react-native";
import { defaultFontText as Text } from "./Text";
import { Card, Flex } from "@ant-design/react-native";

export default class ItemCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      item: props.item,
    };
  }

  render() {
    return (
      <Card style={styles.itemCard}>
        <Card.Body style={styles.itemCardContent}>
          <Flex>
            <Flex.Item flex={1}>
              <Image
                source={{ uri: this.props.item.imageUrl }}
                style={styles.itemImage}
              />
            </Flex.Item>
            <Flex.Item flex={2}>
              <View>
                <Flex direction="column" style={styles.itemInfo} align="start">
                  <Flex.Item>
                    <Text style={styles.itemName}>{this.props.item.title}</Text>
                  </Flex.Item>
                  <Flex.Item>
                    <Text style={styles.location}>
                      {this.props.item.location.split(",")[2]} 추정
                    </Text>
                  </Flex.Item>
                  <Flex.Item>
                    <Text style={styles.reward}>
                      {"보상금 " +
                        this.props.item.reward
                          .toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ",") +
                        " 원"}
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
});
