import React from "react";
import { graphql } from "react-apollo";
import { Button } from "@ant-design/react-native";
import { defaultFontText as Text } from "./Text";
import { gql } from "graphql-tag";

function deleteOwnedItem({ mutate, finishDelete }) {
  return (
    <Button
      size="small"
      onPress={() => {
        mutate()
          .then((result) => {
            console.log(result);
          })
          .catch((error) => {
            console.log(error);
          })
          .then(() => finishDelete());
      }}
    >
      <Text>등록 취소하기</Text>
    </Button>
  );
}

export default graphql(
  gql`
    mutation ($id: Int!) {
      deleteOwned(id: $id) {
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
)(deleteOwnedItem);
