import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { Button, InputItem, List, WhiteSpace } from "@ant-design/react-native";
import SigninButton from '../Component/SigninButton'
import AsyncStorage from '@react-native-async-storage/async-storage'

export default class SigninView extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      ID: "",
      PW: ""
    }
    this.finishSignin = this.finishSignin.bind(this)
  }

  finishSignin (token, userId) {
    if (token) {
      const setData = async () => {
        await AsyncStorage.multiSet([
          ['token', token],
          ['userId', userId]
        ])
      }
      setData()
      this.props.onSignin(token)
    }
  }
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.main_logo}>O.LaF</Text>
        <WhiteSpace style={{ height: "17%" }} />
        <List style={styles.input_list}>
          <InputItem clear placeholder="ID" onChange={(val) => this.setState({ID: val})}/>
          <InputItem clear placeholder="PW" onChange={(val) => this.setState({PW: val})}/>
        </List>
        <WhiteSpace style={{ height: "8%" }} />
        <SigninButton ID={this.state.ID} PW={this.state.PW} finishSignin={this.finishSignin}/>
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
