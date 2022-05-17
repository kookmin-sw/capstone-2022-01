import React from "react";
import { graphql } from "react-apollo";
import { Button } from "@ant-design/react-native";
import { gql } from "graphql-tag";

function deleteOwnedItem({ mutate }) {
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
          });
      }}
    >
      분실 신고 취소하기
    </Button>
  );
}

export default graphql(
  gql`
    mutation ($id: Int!) {
      updateFindingToOwned(id: $id) {
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
