import React from "react";
import { StyleSheet, View } from "react-native";
import { defaultFontText as Text } from "../Component/Text";
import ModalDropdown from "react-native-modal-dropdown";
import Header from "../Component/Header";
import location from "../assets/location.json";
import SignupButton from "../Component/SignupButton";
import LocationSettingButton from "../Component/LocationSettingButton";

export default class LocationView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      group1: [],
      group2: [],
      group3: [],
      selected1: null,
      selected2: null,
      selected3: null,
      name: this.props.navigation.getParam("name", ""),
      ID: this.props.navigation.getParam("ID", ""),
      PW: this.props.navigation.getParam("PW", ""),
      isSignup: this.props.navigation.getParam("isSignup", false),
      finishSignup: this.props.navigation.getParam("finishSignup", null),
      finishSetLocation: this.props.navigation.getParam(
        "finishSetLocation",
        null
      ),
    };
    this.onChangeGroup1 = this.onChangeGroup1.bind(this);
    this.onChangeGroup2 = this.onChangeGroup2.bind(this);
    this.onChangeGroup3 = this.onChangeGroup3.bind(this);
    this.getLocation = this.getLocation.bind(this);
  }

  componentDidMount() {
    let group1 = [];
    for (let idx1 in location) {
      group1.push(location[idx1]["시도"]);
    }
    this.setState({
      group1: group1,
    });
  }

  onChangeGroup1(idx) {
    this.setState({
      selected1: idx,
      selected2: null,
      selected3: null,
      group3: [],
    });
    let group1 = location[idx]["group1"];
    let group2 = [];
    for (let idx2 in group1) {
      group2.push(group1[idx2]["시군구"]);
    }
    this.setState({
      group2: group2,
    });
  }

  onChangeGroup2(idx) {
    this.setState({
      selected2: idx,
      selected3: null,
    });
    if (this.state.selected1 !== null) {
      let group2 = location[this.state.selected1]["group1"][idx]["group2"];
      let group3 = [];
      for (let idx2 in group2) {
        group3.push(group2[idx2]["읍면동"]);
      }
      this.setState({
        group3: group3,
      });
    }
  }

  onChangeGroup3(idx) {
    this.setState({
      selected3: idx,
    });
  }

  getLocation() {
    if (
      this.state.selected1 !== null &&
      this.state.selected2 !== null &&
      this.state.selected3 !== null
    ) {
      return (
        this.state.group1[this.state.selected1] +
        "," +
        this.state.group2[this.state.selected2] +
        "," +
        this.state.group3[this.state.selected3]
      );
    } else {
      return false;
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Header isHome={false} navigation={this.props.navigation} />
        <Text style={{ marginTop: 30, marginLeft: 30, fontSize: 20 }}>
          당신의 지역을 설정하세요
        </Text>
        <Text style={styles.groupLabel}>시/도</Text>
        <ModalDropdown
          options={this.state.group1}
          onSelect={(selected) => this.onChangeGroup1(selected)}
        >
          <View style={styles.dropdown}>
            <Text>
              {this.state.selected1 !== null
                ? this.state.group1[this.state.selected1]
                : "시/도"}
            </Text>
            <Text>↓</Text>
          </View>
        </ModalDropdown>
        <Text style={styles.groupLabel}>시/군/구</Text>
        <ModalDropdown
          options={this.state.group2}
          onSelect={(selected) => this.onChangeGroup2(selected)}
        >
          <View style={styles.dropdown}>
            <Text>
              {this.state.selected2 !== null
                ? this.state.group2[this.state.selected2]
                : "시/군/구"}
            </Text>
            <Text>↓</Text>
          </View>
        </ModalDropdown>
        <Text style={styles.groupLabel}>읍/면/동</Text>
        <ModalDropdown
          options={this.state.group3}
          onSelect={(selected) => this.onChangeGroup3(selected)}
        >
          <View style={styles.dropdown}>
            <Text>
              {this.state.selected3 !== null
                ? this.state.group3[this.state.selected3]
                : "읍/면/동"}
            </Text>
            <Text>↓</Text>
          </View>
        </ModalDropdown>
        {this.state.isSignup ? (
          <SignupButton
            ID={this.state.ID}
            PW={this.state.PW}
            name={this.state.name}
            location={this.getLocation()}
            finishSignup={this.state.finishSignup}
          />
        ) : (
          <LocationSettingButton
            location={this.getLocation()}
            finishSetLocation={this.state.finishSetLocation}
          />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    height: "100%",
  },
  groupLabel: {
    marginTop: 30,
    marginLeft: 40,
    fontSize: 17,
  },
  dropdown: {
    marginTop: 20,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "70%",
    alignSelf: "center",
    borderBottomWidth: 1,
    borderBottomColor: "grey",
    paddingBottom: 10,
  },
  setButton: {
    marginTop: 40,
    width: "30%",
    borderWidth: 0,
    alignSelf: "center",
    backgroundColor: "#4080FF",
  },
});
