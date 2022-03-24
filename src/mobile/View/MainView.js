import React from "react";
import { StyleSheet, View, Text } from "react-native";

export default class MainView extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.logo}>O.LaF</Text>
        <Text>MainView</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
  },
  logo: {
    alignSelf: "center",
    fontSize: 24,
    marginTop: 24,
    color: "#4080FF",
  },
});
