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
      onPress={() => {
        mutate()
          .then((result) => {
            console.log(result);
          })
          .catch((error) => {
            console.log(error);
          });
      }}
    >
      <Text style={{ color: "white" }}>분실자에게 알림 보내기</Text>
    </Button>
  );
}

export default graphql(
  gql`
    mutation {
      putAlarms(targetUserId: 5, text: "test", stuffId: 75) {
        id
      }
    }
  `,
  {
    options: (props) => {
      console.log(props);
      return {
        variables: {
          targetUserId: props.targetUserId,
          stuffId: props.stuffId,
          text: props.text,
        },
      };
    },
  }
)(sendAlarm);
