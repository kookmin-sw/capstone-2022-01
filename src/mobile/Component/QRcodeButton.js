import React from "react";
import { Image } from "react-native";
import { Button } from "@ant-design/react-native";
import SERVER_URI from "../constants/SERVER_URI";

export default class QRcodeButton extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Button
        style={{
          width: 250,
          height: 250,
          alignSelf: "center",
          marginTop: 30,
        }}
      >
        <Image
          source={{ uri: SERVER_URI + this.props.qrcodeUri }}
          style={{ width: 200, height: 200 }}
        />
      </Button>
    );
  }
}
