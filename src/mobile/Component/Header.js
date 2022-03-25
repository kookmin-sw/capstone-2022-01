import React from "react";
import { StyleSheet, View, Text } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

export default class Header extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Icon name="map-outline" size={30} />
        <Text style={styles.logo}>O.LaF</Text>
        <Icon name="notifications-outline" size={30} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: "12%",
    paddingLeft: "3%",
    paddingRight: "3%",
    paddingBottom: "1%",
    borderBottomWidth: 1,
    borderBottomColor: "grey",
  },
  logo: {
    alignSelf: "center",
    fontSize: 35,
    color: "#4080FF",
  },
});
