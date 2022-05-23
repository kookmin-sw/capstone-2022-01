import React from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  Platform,
} from "react-native";
import { defaultFontText as Text } from "./Text";
import Icon from "react-native-vector-icons/Ionicons";

export default class Header extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>
        {this.props.isMain ? (
          <TouchableOpacity
            onPress={() =>
              this.props.navigation.navigate("Location", {
                finishSetLocation: this.props.finishSetLocation,
              })
            }
          >
            <Icon name="compass-outline" size={30} color={"black"} />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
            <Icon name="arrow-back-outline" size={30} color={"black"} />
          </TouchableOpacity>
        )}
        {this.props.title ? (
          <Text style={styles.title}>{this.props.title}</Text>
        ) : (
          <Image source={require("../assets/logo.png")} style={styles.logo} />
        )}
        {this.props.isMain ? (
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate("Alarm");
            }}
          >
            <Icon name="notifications-outline" size={30} color={"black"} />
          </TouchableOpacity>
        ) : (
          <View style={{ width: 30 }} />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: Platform.OS === "ios" ? 0 : "2%",
    paddingLeft: "4%",
    paddingRight: "4%",
    paddingBottom: "2%",
    backgroundColor: "white",
    borderBottomWidth: 0.5,
    borderBottomColor: "#DDDDDD",
  },
  logo: {
    margin: 5,
    width: 108,
    height: 30,
  },
  title: {
    alignSelf: "center",
    fontSize: 25,
    fontWeight: "200",
  },
});
