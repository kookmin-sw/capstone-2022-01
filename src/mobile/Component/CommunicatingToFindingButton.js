import React from "react";
import { graphql } from "react-apollo";
import { defaultFontText as Text } from "./Text";
import { Button } from "@ant-design/react-native";
import { gql } from "graphql-tag";

function communicatingToFinding({ mutate, refetch }) {
  return (
    <Button
      style={{
        width: "70%",
        borderWidth: 1,
        alignSelf: "center",
        borderColor: "#4080FF",
        height: 30,
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
            refetch();
          });
      }}
    >
      <Text style={{ color: "#4080FF", fontSize: 15 }}>찾는 중으로 변경</Text>
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
        },
      };
    },
  }
)(communicatingToFinding);
