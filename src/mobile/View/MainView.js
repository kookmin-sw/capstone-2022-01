import React from "react";
import { StyleSheet, View } from "react-native";
import Header from "../Component/Header";
import Footer from "../Component/Footer";
import MainViewComponents from "../Component/MainViewComponents";
import ItemViewComponents from "../Component/ItemViewComponents";
import ChatlistViewComponents from "../Component/ChatlistViewComponents";
import ProfileViewComponents from "../Component/ProfileViewComponents";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default class MainView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: "Main",
      location: "",
    };
    this.onChangeTab = this.onChangeTab.bind(this);
  }

  async componentWillMount() {
    const location = await AsyncStorage.getItem("location");
    if (location) {
      this.setState({
        location: location,
      });
    }
  }

  onChangeTab(tabName) {
    this.setState({
      selectedTab: tabName,
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Header navigation={this.props.navigation} isMain={true} />
        {
          {
            Main: (
              <MainViewComponents
                navigation={this.props.navigation}
                location={this.state.location}
              />
            ),
            Item: <ItemViewComponents navigation={this.props.navigation} />,
            Chatlist: (
              <ChatlistViewComponents navigation={this.props.navigation} />
            ),
            Profile: (
              <ProfileViewComponents navigation={this.props.navigation} />
            ),
          }[this.state.selectedTab]
        }
        <Footer
          selectedTab={this.state.selectedTab}
          onChangeTab={this.onChangeTab}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    height: "100%",
  },
});
