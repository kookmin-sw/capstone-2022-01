import React from "react";
import { StyleSheet, View, Text } from "react-native";

export default class SigninView extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.logo}>O.LaF</Text>
        <Text>SigninView</Text>
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
