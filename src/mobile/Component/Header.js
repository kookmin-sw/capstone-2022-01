import React from 'react'
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'

export default class Header extends React.Component {
  constructor (props) {
    super(props)
  }

  render () {
    return (
      <View style={styles.container}>
        {this.props.isMain ? (
          <TouchableOpacity
            onPress={() =>
              this.props.navigation.navigate('Location')
            }
          >
            <Icon name="map-outline" size={30}/>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={() =>
              this.props.navigation.goBack()
            }
          >
            <Icon name="arrow-back-outline" size={30}/>
          </TouchableOpacity>
        )}
        {
          this.props.title ? (
            <Text style={styles.title}>{this.props.title}</Text>
          ) : (
            <Text style={styles.logo}>O.LaF</Text>
          )
        }

        {
          this.props.isMain ? (
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate('Alarm')
              }}>
              <Icon name="notifications-outline" size={30}/>
            </TouchableOpacity>
          ) : <View style={{width: 30}}/>
        }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: '12%',
    paddingLeft: '3%',
    paddingRight: '3%',
    paddingBottom: '1%',
    borderBottomWidth: 1,
    borderBottomColor: 'grey',
  },
  logo: {
    alignSelf: 'center',
    fontSize: 35,
    color: '#4080FF',
  },
  title: {
    alignSelf: 'center',
    fontSize: 25,
    fontWeight: "200"
  }
})
