import React from "react";
import { graphql } from "react-apollo";
import { defaultFontText as Text } from "./Text";
import { Button } from "@ant-design/react-native";
import { gql } from "graphql-tag";

function ownedToFinding({ mutate }) {
  return (
    <Button
      style={{
        marginTop: 40,
        width: "70%",
        borderWidth: 0,
        alignSelf: "center",
        backgroundColor: "#4080FF",
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
      <Text style={{ color: "white" }}>분실 신고하기</Text>
    </Button>
  );
}

export default graphql(
  gql`
    mutation ($id: Int!, $location: String!, $reward: Int!) {
      updateOwnedToFinding(id: $id, location: $location, reward: $reward) {
        id
      }
    }
  `,
  {
    options: (props) => {
      return {
        variables: {
          id: props.id,
          location: props.location,
          reward: props.reward,
        },
      };
    },
  }
)(ownedToFinding);
