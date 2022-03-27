import React from "react";
import { StyleSheet, View, Text, ScrollView, Image } from "react-native";
import Header from "../Component/Header";
import {
  Flex,
  InputItem,
  Picker,
  List,
  Provider,
  Button,
} from "@ant-design/react-native";
import Icon from "react-native-vector-icons/Ionicons";

export default class RegistrationView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sizes: [
        {
          value: "2x2",
          label: "2cm x 2cm",
        },
        {
          value: "3x3",
          label: "3cm x 3cm",
        },
        {
          value: "5x5",
          label: "5cm x 5cm",
        },
        {
          value: "10x10",
          label: "10cm x 10cm",
        },
      ],
      value: ["2x2"],
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <Header
          isHome={false}
          navigation={this.props.navigation}
          destination={"Item"}
        />
        <ScrollView>
          <Text style={styles.title}>물건 등록</Text>
          <Flex align="center" style={styles.input}>
            <Flex.Item flex={1}>
              <Text style={styles.tag}>이름</Text>
            </Flex.Item>
            <Flex.Item flex={3}>
              <InputItem />
            </Flex.Item>
          </Flex>
          <Flex align="center" style={styles.input}>
            <Flex.Item flex={1}>
              <Text style={styles.tag}>사진</Text>
            </Flex.Item>
            <Flex.Item flex={1} />
            <Flex.Item flex={1}>
              <Icon name="camera-outline" size={30} />
            </Flex.Item>
            <Flex.Item flex={1}>
              <Icon name="image-outline" size={30} />
            </Flex.Item>
          </Flex>
          <Text style={styles.title}>QR 코드</Text>
          <Flex align="center" style={styles.input}>
            <Flex.Item flex={1}>
              <Text style={styles.tag}>사이즈</Text>
            </Flex.Item>
            <Flex.Item flex={3}>
              <Provider>
                <List>
                  <Picker
                    data={this.state.sizes}
                    cols={1}
                    value={this.state.value}
                  >
                    <List.Item />
                  </Picker>
                </List>
              </Provider>
            </Flex.Item>
          </Flex>
          <Button
            style={{
              width: 250,
              height: 250,
              alignSelf: "center",
              marginTop: 30,
            }}
          >
            <Image
              source={require("../assets/dummy_data/qr.png")}
              style={{ width: 200, height: 200 }}
            />
          </Button>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    height: "100%",
  },
  title: {
    fontSize: 25,
    marginTop: 20,
    marginLeft: 20,
  },
  input: {
    paddingTop: 30,
    paddingLeft: 30,
    paddingRight: 40,
  },
  tag: {
    alignSelf: "flex-end",
    marginRight: 20,
    fontSize: 15,
  },
});
