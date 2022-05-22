import React from "react";
import { graphql } from "react-apollo";
import { Button } from "@ant-design/react-native";
import { defaultFontText as Text } from "./Text";
import { gql } from "graphql-tag";

function sendAlarm({ mutate, finishCreateChatting }) {
  return (
    <Button
      style={{
        width: "60%",
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
          })
          .then(() => {
            finishCreateChatting();
          });
      }}
    >
      <Text style={{ color: "white" }}>채팅방 생성</Text>
    </Button>
  );
}

export default graphql(
  gql`
    mutation ($targetUserId: Int!, $stuffId: Int!) {
      createMessage(targetUserId: $targetUserId, stuffId: $stuffId) {
        id
      }
      updateFindingToCommunicating(id: $stuffId, acquirerId: $targetUserId) {
        id
      }
    }
  `,
  {
    options: (props) => {
      return {
        variables: {
          targetUserId: props.targetUserId,
          stuffId: props.stuffId,
        },
      };
    },
  }
)(sendAlarm);
