import React from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import Header from "../Component/Header";
import Footer from "../Component/Footer";
import { Flex } from "@ant-design/react-native";
import Icon from "react-native-vector-icons/Ionicons";

export default class ProfileView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      profileImage: null,
      name: "김성식",
      pointAmount: 100000,
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <Header isHome={true} />
        <Flex style={{ height: "20%" }}>
          <Flex.Item flex={1}>
            {this.state.profileImage == null ? (
              <Icon
                name="person-circle-outline"
                size={130}
                style={styles.icon}
              />
            ) : (
              <Image source={this.props.opponentImage} />
            )}
          </Flex.Item>
          <Flex.Item flex={2}>
            <View style={styles.info}>
              <Text style={styles.name}>{this.state.name}</Text>
              <Text style={styles.pointAmount}>
                {"보상금 " +
                  this.state.pointAmount
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",") +
                  " 원"}
              </Text>
            </View>
          </Flex.Item>
        </Flex>
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
  icon: {
    overflow: "hidden",
    color: "grey",
    marginLeft: 10,
  },
  info: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    height: "100%",
  },
  name: {
    color: "#4080FF",
    fontSize: 30,
    marginTop: 20,
    marginLeft: 20,
  },
  pointAmount: {
    marginBottom: 20,
    marginTop: -20,
    marginLeft: 20,
    fontSize: 17,
  },
});
