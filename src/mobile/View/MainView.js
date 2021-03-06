import React from "react";
import { StyleSheet, View } from "react-native";
import Header from "../Component/Header";
import Footer from "../Component/Footer";
import MainViewComponents from "../Component/MainViewComponents";
import ItemViewComponents from "../Component/ItemViewComponents";
import QRcodeScannerComponents from "../Component/QRcodeScannerComponents";
import ChatlistViewComponents from "../Component/ChatlistViewComponents";
import ProfileViewComponents from "../Component/ProfileViewComponents";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default class MainView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: "Main",
      location: "",
      userId: "",
    };
    this.onChangeTab = this.onChangeTab.bind(this);
    this.finishSetLocation = this.finishSetLocation.bind(this);
  }

  async componentWillMount() {
    const location = await AsyncStorage.getItem("location");
    const userId = await AsyncStorage.getItem("userId");
    if (location) {
      this.setState({
        location: location,
      });
    }
    if (userId) {
      this.setState({
        userId: userId,
      });
    }
  }

  onChangeTab(tabName) {
    this.setState({
      selectedTab: tabName,
    });
  }

  finishSetLocation(location) {
    if (location) {
      const setData = async () => {
        await AsyncStorage.multiSet([["location", location]]);
      };
      setData();
      this.setState({
        location: location,
      });
      this.props.navigation.navigate("Main");
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Header
          navigation={this.props.navigation}
          isMain={true}
          finishSetLocation={this.finishSetLocation}
        />
        {
          {
            Main: (
              <MainViewComponents
                navigation={this.props.navigation}
                location={this.state.location}
              />
            ),
            Item: <ItemViewComponents navigation={this.props.navigation} />,
            QRcode: (
              <QRcodeScannerComponents
                navigation={this.props.navigation}
                userId={this.state.userId}
                onChangeTab={this.onChangeTab}
              />
            ),
            Chatlist: (
              <ChatlistViewComponents
                navigation={this.props.navigation}
                userId={this.state.userId}
              />
            ),
            Profile: (
              <ProfileViewComponents
                navigation={this.props.navigation}
                onSignout={this.props.onSignout}
              />
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
