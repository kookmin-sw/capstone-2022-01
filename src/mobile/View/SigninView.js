import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { Button, InputItem, List, WhiteSpace } from "@ant-design/react-native";

export default class SigninView extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.main_logo}>O.LaF</Text>
        <WhiteSpace style={{ height: "17%" }} />
        <List style={styles.input_list}>
          <InputItem clear placeholder="ID" />
          <InputItem clear placeholder="PW" />
        </List>
        <WhiteSpace style={{ height: "8%" }} />
        <Button style={styles.button}>Sign in</Button>
        <WhiteSpace style={{ height: "2%" }} />
        <Button style={styles.button} onPress={() => {
          this.props.navigation.navigate("Signup")
        }}>Sign up</Button>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    alignItems: "center",
  },
  main_logo: {
    alignSelf: "center",
    fontSize: 70,
    marginTop: "45%",
    color: "#4080FF",
  },
  input_list: {
    width: "75%",
  },
  button: {
    borderWidth: 0,
    borderBottomWidth: 1,
  },
});
