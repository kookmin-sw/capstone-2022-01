import React from "react";
import { graphql } from "react-apollo";
import { Text } from "react-native";
import { Button } from "@ant-design/react-native";
import { gql } from "graphql-tag";

function signup({ mutate, location, finishSignup }) {
  let token = null;
  let userId = null;
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
              if (result.data.signup.token) {
                token = result.data.signup.token;
                userId = result.data.signup.user.id;
              }
            })
            .catch((error) => {
              console.log(error);
            })
            .then(() => {
              finishSignup(token, userId, location);
            });
        }
      }}
    >
      <Text style={{ color: "white" }}>회원가입</Text>
    </Button>
  );
}

export default graphql(
  gql`
    mutation signup(
      $email: String!
      $password: String!
      $name: String!
      $location: String!
    ) {
      signup(
        email: $email
        password: $password
        name: $name
        location: $location
      ) {
        token
        user {
          id
        }
      }
    }
  `,
  {
    options: (props) => {
      return {
        variables: {
          email: props.ID,
          password: props.PW,
          name: props.name,
          location: props.location,
        },
      };
    },
  }
)(signup);
