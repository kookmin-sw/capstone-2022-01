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
import * as Font from "expo-font";
import { Text } from "react-native";

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

let fonts = {
  Pretendard: require("./assets/fonts/Pretendard-Light.otf"),
};

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      token: "",
      client: new ApolloClient({
        link: authLink.concat(httpLink),
        cache: new InMemoryCache(),
      }),
      fontsLoaded: false,
    };
    this.onSignin = this.onSignin.bind(this);
    this.onSignout = this.onSignout.bind(this);
  }

  async _loadFontsAsync() {
    await Font.loadAsync(fonts);
    this.setState({ fontsLoaded: true });
  }

  componentDidMount() {
    this._loadFontsAsync();
  }

  onSignin(token) {
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

  onSignout() {
    AsyncStorage.setItem("token", "");
    const authLink = setContext((_, { headers }) => {
      return {
        headers: {
          ...headers,
          authorization: "",
        },
      };
    });
    this.setState({
      token: "",
      client: new ApolloClient({
        link: authLink.concat(httpLink),
        cache: new InMemoryCache(),
      }),
    });
  }

  render() {
    if (!this.state.fontsLoaded) {
      return <Text>loading</Text>;
    }
    return (
      <ApolloProvider client={this.state.client}>
        {this.state.token ? (
          <AppNavigator screenProps={{ onSignout: this.onSignout }} />
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
