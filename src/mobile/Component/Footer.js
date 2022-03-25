import React from "react";
import { StyleSheet, View } from "react-native";
import { TabBar } from "@ant-design/react-native";
import Icon from "react-native-vector-icons/Ionicons";

export default class Footer extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <TabBar>
          <TabBar.Item title="" icon={<Icon name="home-outline" size={20} />} />
          <TabBar.Item
            title=""
            icon={<Icon name="file-tray-full-outline" size={20} />}
          />
          <TabBar.Item
            title=""
            icon={<Icon name="chatbubble-outline" size={20} />}
          />
          <TabBar.Item
            title=""
            icon={<Icon name="person-outline" size={20} />}
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
});
