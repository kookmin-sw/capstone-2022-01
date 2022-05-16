import React from "react";
import AppNavigator from "./AppNavigator";
import SigninNavigator from "./SigninNavigator";
import { ApolloProvider } from "react-apollo";
import ApolloClient from "apollo-client";
import { createHttpLink } from "apollo-link-http";
import { setContext } from "apollo-link-context";
import { InMemoryCache } from "apollo-cache-inmemory";
import SERVER_URI from "./constants/SERVER_URI";
import AsyncStorage from "@react-native-async-storage/async-storage";

const httpLink = createHttpLink({
  uri: SERVER_URI,
});

const authLink = setContext((_, { headers }) => {
  const token = AsyncStorage.getItem("token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      token: "",
      client: new ApolloClient({
        link: authLink.concat(httpLink),
        cache: new InMemoryCache(),
      }),
    };
    this.onSignin = this.onSignin.bind(this);
  }

  onSignin(token) {
    const httpLink = createHttpLink({
      uri: SERVER_URI,
    });
    const authLink = setContext((_, { headers }) => {
      return {
        headers: {
          ...headers,
          authorization: token ? `Bearer ${token}` : "",
        },
      };
    });
    this.setState({
      token: token,
      client: new ApolloClient({
        link: authLink.concat(httpLink),
        cache: new InMemoryCache(),
      }),
    });
  }

  render() {
    return (
      <ApolloProvider client={this.state.client}>
        {this.state.token ? (
          <AppNavigator />
        ) : (
          <SigninNavigator
            screenProps={{
              onSignin: this.onSignin,
            }}
          />
        )}
      </ApolloProvider>
    );
  }
}
