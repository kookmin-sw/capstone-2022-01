import React from "react";
import { StyleSheet, View } from "react-native";
import { TabBar } from "@ant-design/react-native";
import Icon from "react-native-vector-icons/Ionicons";

const ICON_SIZE = 23;

export default class Footer extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <TabBar>
          <TabBar.Item
            title=""
            onPress={() => this.props.onChangeTab("Main")}
            icon={
              this.props.selectedTab === "Main" ? (
                <Icon name="home" size={ICON_SIZE} />
              ) : (
                <Icon name="home-outline" size={ICON_SIZE} />
              )
            }
          />
          <TabBar.Item
            title=""
            onPress={() => this.props.onChangeTab("Item")}
            icon={
              this.props.selectedTab === "Item" ? (
                <Icon name="file-tray-full" size={ICON_SIZE} />
              ) : (
                <Icon name="file-tray-full-outline" size={ICON_SIZE} />
              )
            }
          />
          <TabBar.Item
            title=""
            onPress={() => this.props.onChangeTab("QRcode")}
            icon={
              this.props.selectedTab === "QRcode" ? (
                <View style={styles.qrButton}>
                  <Icon name="qr-code" size={ICON_SIZE} color={"white"} />
                </View>
              ) : (
                <View style={styles.qrButton}>
                  <Icon
                    name="qr-code-outline"
                    size={ICON_SIZE}
                    color={"white"}
                  />
                </View>
              )
            }
          />
          <TabBar.Item
            title=""
            onPress={() => this.props.onChangeTab("Chatlist")}
            icon={
              this.props.selectedTab === "Chatlist" ? (
                <Icon name="chatbubble" size={ICON_SIZE} />
              ) : (
                <Icon name="chatbubble-outline" size={ICON_SIZE} />
              )
            }
          />
          <TabBar.Item
            title=""
            onPress={() => this.props.onChangeTab("Profile")}
            icon={
              this.props.selectedTab === "Profile" ? (
                <Icon name="person" size={ICON_SIZE} />
              ) : (
                <Icon name="person-outline" size={ICON_SIZE} />
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
    backgroundColor: "white",
  },
  qrButton: {
    width: 60,
    height: 60,
    backgroundColor: "#4080FF",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
  },
});
