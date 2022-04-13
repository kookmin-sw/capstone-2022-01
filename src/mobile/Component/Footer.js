import React from "react";
import { StyleSheet, View } from "react-native";
import { TabBar } from "@ant-design/react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { rgbaColor } from "react-native-reanimated/src/reanimated2/Colors";

export default class Footer extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <TabBar>
          <TabBar.Item
            title=""
            onPress={() => this.props.navigation.navigate("Main")}
            icon={
              this.props.navigation.state.routeName === "Main" ? (
                <Icon name="home" size={20} />
              ) : (
                <Icon name="home-outline" size={20} />
              )
            }
          />
          <TabBar.Item
            title=""
            onPress={() => this.props.navigation.navigate("Item")}
            icon={
              this.props.navigation.state.routeName === "Item" ? (
                <Icon name="file-tray-full" size={20} />
              ) : (
                <Icon name="file-tray-full-outline" size={20} />
              )
            }
          />
          <TabBar.Item
            title=""
            onPress={() => this.props.navigation.navigate("Chatlist")}
            icon={
              this.props.navigation.state.routeName === "Chatlist" ? (
                <Icon name="chatbubble" size={20} />
              ) : (
                <Icon name="chatbubble-outline" size={20} />
              )
            }
          />
          <TabBar.Item
            title=""
            onPress={() => this.props.navigation.navigate("Profile")}
            icon={
              this.props.navigation.state.routeName === "Profile" ? (
                <Icon name="person" size={20} />
              ) : (
                <Icon name="person-outline" size={20} />
              )
            }
          />
        </TabBar>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    flex: 1,
    bottom: 0,
    width: "100%",
  },
  button: {
    borderWidth: 0,
    flex: 1,
    backgroundColor: rgbaColor(255, 255, 255, 0),
  },
});
