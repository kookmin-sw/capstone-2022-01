import React from "react";
import { graphql } from "react-apollo";
import { defaultFontText as Text } from "./Text";
import { Button } from "@ant-design/react-native";
import { gql } from "graphql-tag";

function tradeReward({ mutate, navigation }) {
  return (
    <Button
      style={{
        width: "80%",
        borderWidth: 1,
        alignSelf: "center",
        borderColor: "#4080FF",
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
            navigation.navigate("Main");
          });
      }}
    >
      <Text style={{ color: "#4080FF" }}>사례금 교환하기</Text>
    </Button>
  );
}

export default graphql(
  gql`
    mutation ($id: Int!) {
      tradingReward(id: $id) {
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
)(tradeReward);
