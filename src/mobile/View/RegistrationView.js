import React from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import { defaultFontText as Text } from "../Component/Text";
import Header from "../Component/Header";
import { Flex, InputItem, Button } from "@ant-design/react-native";
import Icon from "react-native-vector-icons/Ionicons";
import * as ImagePicker from "expo-image-picker";
import RegistrationButton from "../Component/RegistrationButton";
import QRcodeGenerationButton from "../Component/QRcodeGenerationButton";
import QRcodeButton from "../Component/QRcodeButton";

export default class RegistrationView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      itemImageUri: "",
      qrcodeUri: "",
      itemId: null,
    };
    this.finishRegistration = this.finishRegistration.bind(this);
    this.finishQRcodeGeneration = this.finishQRcodeGeneration.bind(this);
  }

  async addImage() {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      this.setState({
        itemImageUri: result.uri,
      });
    }
  }

  finishRegistration(itemId) {
    if (itemId) {
      this.setState({
        itemId: itemId,
      });
    }
  }

  finishQRcodeGeneration(qrcodeUrl) {
    if (qrcodeUrl) {
      this.setState({
        qrcodeUri: qrcodeUrl,
      });
    }
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
              <InputItem
                onChange={(value) => {
                  this.setState({ title: value });
                }}
              />
            </Flex.Item>
          </Flex>
          <Flex style={styles.input}>
            <Flex.Item flex={1}>
              <Text style={styles.tag}>사진</Text>
            </Flex.Item>
            <Flex.Item flex={1} />
            <Flex.Item flex={1}>
              <TouchableOpacity onPress={() => this.addImage()}>
                <Icon name="image-outline" size={30} />
              </TouchableOpacity>
            </Flex.Item>
            <Flex.Item flex={1}>
              {this.state.itemImageUri !== "" ? (
                <Image
                  source={{ uri: this.state.itemImageUri }}
                  style={{ width: 70, height: 70, borderRadius: 5 }}
                />
              ) : (
                <View />
              )}
            </Flex.Item>
          </Flex>
          {this.state.itemId ? (
            <View />
          ) : (
            <RegistrationButton
              title={this.state.title}
              imageUrl={this.state.itemImageUri}
              finishRegistration={this.finishRegistration}
            />
          )}

          {this.state.itemId ? (
            <View>
              <Text style={styles.title}>QR 코드</Text>
              {this.state.qrcodeUri === "" ? (
                <QRcodeGenerationButton
                  id={this.state.itemId}
                  finishQRcodeGeneration={this.finishQRcodeGeneration}
                />
              ) : (
                <QRcodeButton qrcodeUri={this.state.qrcodeUri} />
              )}
            </View>
          ) : (
            <View />
          )}
          {this.state.qrcodeUri ? (
            <Button
              style={{
                marginTop: 40,
                width: "30%",
                borderWidth: 0,
                alignSelf: "center",
                backgroundColor: "#4080FF",
              }}
              onPress={() => {
                this.props.navigation.goBack();
              }}
            >
              <Text style={{ color: "white" }}>완료</Text>
            </Button>
          ) : (
            <View />
          )}
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
