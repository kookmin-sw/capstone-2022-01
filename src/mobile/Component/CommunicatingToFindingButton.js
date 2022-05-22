import React from "react";
import { graphql } from "react-apollo";
import { defaultFontText as Text } from "./Text";
import { Button } from "@ant-design/react-native";
import { gql } from "graphql-tag";

function communicatingToFinding({ mutate, navigation, chattingRefetch }) {
  return (
    <Button
      style={{
        width: "80%",
        borderWidth: 1,
        alignSelf: "center",
        borderColor: "red",
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
            chattingRefetch();
            navigation.navigate("Main");
          });
      }}
    >
      <Text style={{ color: "red" }}>채팅방 나가기</Text>
    </Button>
  );
}

export default graphql(
  gql`
    mutation ($id: Int!) {
      updateCommunicatingToFinding(id: $id) {
        id
      }
    }
  `,
  {
    options: (props) => {
      return {
        variables: {
          id: props.id,
          navigation: props.navigation,
        },
      };
    },
  }
)(communicatingToFinding);
