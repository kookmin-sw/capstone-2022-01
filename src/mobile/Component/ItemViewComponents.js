import React from "react";
import { StyleSheet, View, Text, ScrollView } from "react-native";
import CommunicatingItemCard from "../Component/CommunicatingItemCard";
import FindingItemCard from "../Component/FindingItemCard";
import OwnedItemCard from "../Component/OwnedItemCard";
import { Button } from "@ant-design/react-native";

export default class ItemViewComponents extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: {
        communicating: [
          {
            image: require("../assets/dummy_data/tumbler.jpeg"),
            itemName: "스타벅스 텀블러",
            location: "정릉동",
            reward: 5000,
            opponentName: "김진우",
          },
        ],
        finding: [
          {
            image: require("../assets/dummy_data/adaptor.jpeg"),
            itemName: "HDMI-to-C 어댑터",
            location: "정릉동",
            reward: 6000,
          },
        ],
        owned: [
          {
            image: require("../assets/dummy_data/keyboard.jpeg"),
            itemName: "애플 매직 키보드",
          },
        ],
      },
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          <Text style={styles.categoryText}>소통 중</Text>
          {this.state.items.communicating.map((item, index) => {
            return <CommunicatingItemCard item={item} key={index} />;
          })}
          <Text style={styles.categoryText}>찾는 중</Text>
          {this.state.items.finding.map((item, index) => {
            return <FindingItemCard item={item} key={index} />;
          })}
          <Text style={styles.categoryText}>내 물건</Text>
          {this.state.items.owned.map((item, index) => {
            return <OwnedItemCard item={item} key={index} />;
          })}
        </ScrollView>
        <Button
          style={styles.registrationButton}
          onPress={() => this.props.navigation.navigate("Registration")}
        >
          <Text style={{ color: "white", fontSize: 30 }}>+</Text>
        </Button>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    height: "100%",
  },
  categoryText: {
    fontSize: 20,
    marginTop: 15,
    marginLeft: 20,
  },
  registrationButton: {
    height: 60,
    width: 60,
    borderRadius: 30,
    position: "absolute",
    bottom: 100,
    right: 20,
    borderWidth: 0,
    backgroundColor: "#4080FF",
  },
});
