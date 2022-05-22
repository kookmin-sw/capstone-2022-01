import React from "react";
import { View, StyleSheet } from "react-native";
import { defaultFontText as Text } from "./Text";
import { Button } from "@ant-design/react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import SendAlarmViewComponents from "./SendAlarmViewComponents";

export default class QRcodeScannerComponents extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      scanned: false,
      hasCameraPermission: null,
      stuffId: null,
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
    if (type === "org.iso.QRCode" && !isNaN(data)) {
      this.setState({
        scanned: true,
        stuffId: parseInt(data),
      });
    }
  }

  render() {
    if (this.state.hasCameraPermission === null) {
      return <Text>Requesting for camera permission</Text>;
    } else if (this.state.hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    } else if (this.state.scanned && this.state.stuffId !== null) {
      return (
        <SendAlarmViewComponents
          stuffId={this.state.stuffId}
          userId={this.props.userId}
          onChangeTab={this.props.onChangeTab}
        />
      );
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
