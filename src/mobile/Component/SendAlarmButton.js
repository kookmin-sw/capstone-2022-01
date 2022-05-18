import React from "react";
import { graphql } from "react-apollo";
import { Button } from "@ant-design/react-native";
import { defaultFontText as Text } from "./Text";
import { gql } from "graphql-tag";

function sendAlarm({ mutate }) {
  return (
    <Button
      style={{
        width: "70%",
        backgroundColor: "#4080ff",
        alignSelf: "center",
      }}
    >
      <Text style={{ color: "white" }}>분실자에게 알림 보내기</Text>
    </Button>
  );
}

export default graphql(
  gql`
    mutation ($text: String!) {
      putAlarms(text: $text) {
        id
      }
    }
  `,
  {
    options: (props) => {
      return {
        variables: {
          text: props.text,
        },
      };
    },
  }
)(sendAlarm);
