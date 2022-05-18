import React from "react";
import { graphql } from "react-apollo";
import { defaultFontText as Text } from "./Text";
import { Button } from "@ant-design/react-native";
import { gql } from "graphql-tag";

function setLocation({ mutate, location, finishSetLocation }) {
  let newLocation = null;
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
        if (location) {
          mutate()
            .then((result) => {
              if (result.data.newLocation) {
                newLocation = result.data.newLocation.location;
              }
            })
            .catch((error) => {
              console.log(error);
            })
            .then(() => {
              finishSetLocation(newLocation);
            });
        }
      }}
    >
      <Text style={{ color: "white" }}>설정하기</Text>
    </Button>
  );
}

export default graphql(
  gql`
    mutation ($location: String!) {
      newLocation: updateMyLocation(location: $location) {
        location
      }
    }
  `,
  {
    options: (props) => {
      return {
        variables: {
          location: props.location,
        },
      };
    },
  }
)(setLocation);
