import React from "react";
import { StyleSheet, View, Text } from "react-native";
import Header from "../Component/Header";
import Footer from "../Component/Footer";

export default class MainView extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Header />
        <Text>MainView</Text>
        <Footer />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    height: "100%",
  },
});
