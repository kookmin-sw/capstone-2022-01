import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import Header from '../Component/Header'
import Footer from '../Component/Footer'

export default class LocationView extends React.Component {
  constructor (props) {
    super(props)
  }

  render () {
    console.log(this.props.navigation)
    return (
      <View style={styles.container}>
        <Header isHome={false} navigation={this.props.navigation}/>
        <Text>LocationView</Text>
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
