import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import Header from '../Component/Header'
import Footer from '../Component/Footer'

export default class ChattingView extends React.Component {
  constructor (props) {
    super(props)
  }

  render () {
    return (
      <View style={styles.container}>
        <Header/>
        <Text>ChattingView</Text>
        <Footer navigation={this.props.navigation}/>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    height: '100%'
  }
})
