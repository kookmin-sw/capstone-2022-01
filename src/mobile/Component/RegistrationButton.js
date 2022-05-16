import React from "react";
import { graphql } from "react-apollo";
import { Button } from "@ant-design/react-native";
import { gql } from "graphql-tag";
import { Text } from "react-native";

function itemRegistration({ mutate, finishRegistration }) {
  let itemId = null;
  return (
    <Button
      style={{
        marginTop: 40,
        width: "30%",
        borderWidth: 0,
        alignSelf: "center",
        backgroundColor: "#4080FF",
      }}
      onPress={() => {
        mutate()
          .then((result) => {
            if (result.data.stuff.id) {
              itemId = result.data.stuff.id;
            }
          })
          .catch((error) => {
            console.log(error);
          })
          .then(() => {
            finishRegistration(itemId);
          });
      }}
    >
      <Text style={{ color: "white" }}>등록하기</Text>
    </Button>
  );
}

export default graphql(
  gql`
    mutation ($title: String!, $imageUrl: String!) {
      stuff: uploadStuff(title: $title, qrcodeUrl: "", imageUrl: $imageUrl) {
        id
      }
    }
  `,
  {
    options: (props) => {
      return {
        variables: {
          title: props.title,
          imageUrl: props.imageUrl,
        },
      };
    },
  }
)(itemRegistration);
