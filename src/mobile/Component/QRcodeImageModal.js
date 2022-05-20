import React from "react";
import { StyleSheet, View, Image, TouchableOpacity } from "react-native";
import { Modal } from "@ant-design/react-native";
import SERVER_URI from "../constants/SERVER_URI";
import * as MediaLibrary from "expo-media-library";
import Icon from "react-native-vector-icons/Ionicons";
import ViewShot from "react-native-view-shot";

export default class QRcodeImageModal extends React.Component {
  constructor(props) {
    super(props);
    this.saveImage = this.saveImage.bind(this);
    this.imageUri = "";
  }

  async saveImage() {
    console.log(this.props.qrcodeUrl);
    await MediaLibrary.saveToLibraryAsync(this.state.imageUri).then(
      this.props.closeQRModal
    );
  }

  render() {
    return (
      <Modal
        visible={this.props.qrModalVisible}
        onClose={this.props.closeQRModal}
        transparent
        closable
        maskClosable
      >
        <ViewShot
          onCapture={(uri) => this.setState({ imageUri: uri })}
          captureMode="continuous"
        >
          <View style={styles.border}>
            <Image source={require("../assets/logo.png")} style={styles.logo} />
            <Image
              source={{ uri: SERVER_URI + this.props.qrcodeUrl }}
              style={styles.qrCode}
            />
            <Image source={require("../assets/info.png")} style={styles.info} />
          </View>
        </ViewShot>
        <TouchableOpacity
          style={{ alignSelf: "flex-end" }}
          onPress={this.saveImage}
        >
          <Icon name="download-outline" size={25} />
        </TouchableOpacity>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    height: "100%",
  },
  border: {
    backgroundColor: "white",
    margin: 10,
    borderRadius: 10,
  },
  logo: {
    width: 72,
    height: 20,
    marginTop: 20,
    marginLeft: 20,
  },
  qrCode: {
    width: 200,
    height: 200,
    alignSelf: "center",
    marginTop: 30,
  },
  info: {
    width: 230,
    height: 27,
    alignSelf: "center",
    marginTop: 20,
    marginBottom: 10,
  },
});
