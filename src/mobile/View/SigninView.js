import React from "react";
import { StyleSheet, View, Image } from "react-native";
import { defaultFontText as Text } from "../Component/Text";
import { Button, InputItem, List, WhiteSpace } from "@ant-design/react-native";
import SigninButton from "../Component/SigninButton";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default class SigninView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ID: "test",
      PW: "test",
    };
    this.finishSignin = this.finishSignin.bind(this);
  }

  finishSignin(token, userId, location, userName) {
    if (token) {
      const setData = async () => {
        await AsyncStorage.multiSet([
          ["token", token],
          ["userId", userId],
          ["location", location],
          ["userName", userName],
        ]);
      };
      setData();
      this.props.onSignin(token);
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Image
          style={styles.main_logo}
          source={require("../assets/logo.png")}
        />
        <WhiteSpace style={{ height: "20%" }} />
        <List style={styles.input_list}>
          <InputItem
            clear
            placeholder="ID"
            value={this.state.ID}
            onChange={(val) => this.setState({ ID: val.toLowerCase() })}
          />
          <InputItem
            clear
            placeholder="PW"
            type="password"
            value={this.state.PW}
            onChange={(val) => this.setState({ PW: val.toLowerCase() })}
          />
        </List>
        <WhiteSpace style={{ height: "10%" }} />
        <SigninButton
          ID={this.state.ID}
          PW={this.state.PW}
          finishSignin={this.finishSignin}
        />
        <WhiteSpace style={{ height: "2%" }} />
        <Button
          style={styles.button}
          onPress={() => {
            this.props.navigation.navigate("Signup", {
              finishSignup: this.finishSignin,
            });
          }}
        >
          <Text>Sign up</Text>
        </Button>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    alignItems: "center",
    fontFamily: "Pretendard",
  },
  main_logo: {
    alignSelf: "center",
    marginTop: "45%",
    width: 200,
    height: 56,
  },
  input_list: {
    width: "75%",
  },
  button: {
    borderWidth: 0,
    borderBottomWidth: 1,
  },
});
