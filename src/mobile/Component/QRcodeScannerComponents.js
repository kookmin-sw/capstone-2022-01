import React from "react";
import { View, StyleSheet } from "react-native";
import { defaultFontText as Text } from "./Text";
import { Button } from "@ant-design/react-native";
import { BarCodeScanner } from "expo-barcode-scanner";

export default class QRcodeScannerComponents extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      scanned: false,
      hasCameraPermission: null,
    };
    this.onQRcodeScanned = this.onQRcodeScanned.bind(this);
  }

  componentDidMount() {
    this._requestCameraPermission();
  }

  _requestCameraPermission = async () => {
    const { status } = await BarCodeScanner.requestPermissionsAsync();
    this.setState({
      hasCameraPermission: status === "granted",
    });
  };

  onQRcodeScanned({ data, type }) {
    console.log(data, type);
    this.setState({
      scanned: true,
    });
  }

  render() {
    if (this.state.hasCameraPermission === null) {
      return <Text>Requesting for camera permission</Text>;
    } else if (this.state.hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    } else {
      return (
        <View style={styles.container}>
          <BarCodeScanner
            onBarCodeScanned={this.onQRcodeScanned}
            style={StyleSheet.absoluteFillObject}
          />
          {this.state.scanned && (
            <Button onPress={() => this.setState({ scanned: false })}>
              Tap to Scan Again
            </Button>
          )}
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#000",
  },
});
