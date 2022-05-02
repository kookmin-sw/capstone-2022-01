import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import Header from '../Component/Header'
import { Button, InputItem, List, WhiteSpace } from '@ant-design/react-native'

export default class SignupView extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      name: "",
      ID: "",
      PW: ""
    }
  }

  render () {
    return (
      <View>
        <Header isMain={false} navigation={this.props.navigation}/>
        <View style={styles.container}>
          <Text style={styles.title}>회원가입</Text>
          <WhiteSpace style={{height: '10%'}}/>
          <List style={styles.input_list}>
            <InputItem clear placeholder="이름" onChange={(val) => this.setState({name: val})}/>
            <InputItem clear placeholder="ID" onChange={(val) => this.setState({ID: val})}/>
            <InputItem clear placeholder="PW" onChange={(val) => this.setState({PW: val})}/>
          </List>
          <WhiteSpace style={{height: '8%'}}/>
          <Button style={styles.button} onPress={() => {
            this.props.navigation.navigate('Location', {
              name: this.state.name,
              ID: this.state.ID,
              PW: this.state.PW,
              isSignup: true
            })
          }}>다음 →</Button>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    height: '100%',
    alignItems: 'center'
  },
  title: {
    alignSelf: 'center',
    fontSize: 30,
    fontWeight: '200',
    marginTop: '10%'
  },
  input_list: {
    width: '75%',
  },
  button: {
    borderWidth: 0,
    // borderBottomWidth: 1,
  },
})
