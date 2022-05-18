import React from "react";
import { StyleSheet, View } from "react-native";
import { defaultFontText as Text } from "../Component/Text";
import Header from "../Component/Header";

export default class AlarmView extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>
        <Header isMain={false} navigation={this.props.navigation} />
        <Text>AlarmView</Text>
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
