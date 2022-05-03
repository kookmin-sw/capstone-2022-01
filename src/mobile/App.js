import React from 'react'
import AppNavigator from './AppNavigator'
import SigninNavigator from './SigninNavigator'
import { ApolloClient, ApolloProvider, createHttpLink, InMemoryCache } from '@apollo/client'
import SERVER_URI from './constants/SERVER_URI'
import { setContext } from '@apollo/client/link/context'
import AsyncStorage from '@react-native-async-storage/async-storage'

const httpLink = createHttpLink({
  uri: SERVER_URI
})

const authLink = setContext((_, {headers}) => {
  const token = AsyncStorage.getItem('token')
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : ''
    }
  }
})

export default class App extends React.Component {
  constructor () {
    super()
    this.state = {
      token: '',
      client: new ApolloClient({
        link: authLink.concat(httpLink),
        cache: new InMemoryCache()
      })
    }
    this.onSignin = this.onSignin.bind(this)
  }

  onSignin (token) {
    const httpLink = createHttpLink({
      uri: SERVER_URI
    })
    const authLink = setContext((_, { headers }) => {
      return {
        headers: {
          ...headers,
          authorization: token ? `Bearer ${token}` : ''
        }
      }
    })
    this.setState({
      token: token,
      client: new ApolloClient({
        link: authLink.concat(httpLink),
        cache: new InMemoryCache()
      })
    })
  }

  render () {
    return (
      <ApolloProvider client={this.state.client}>
        {
          this.state.token
            ? <AppNavigator/>
            : <SigninNavigator screenProps={{
              onSignin: this.onSignin
            }}/>
        }
      </ApolloProvider>
    )
  }
}
