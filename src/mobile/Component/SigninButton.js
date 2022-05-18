import React from "react";
import { graphql } from "react-apollo";
import { Button } from "@ant-design/react-native";
import { defaultFontText as Text } from "./Text";
import { gql } from "graphql-tag";

function signin({ mutate, finishSignin }) {
  let token = null;
  let userId = null;
  let location = null;
  return (
    <Button
      style={{
        borderWidth: 0,
        borderBottomWidth: 1,
      }}
      onPress={() => {
        mutate()
          .then((result) => {
            if (result.data.login.token) {
              token = result.data.login.token;
              userId = result.data.login.user.id;
              location = result.data.login.user.location;
            }
          })
          .catch((error) => {
            console.log(error);
          })
          .then(() => {
            finishSignin(token, userId, location);
          });
      }}
    >
      <Text>Sign In</Text>
    </Button>
  );
}

export default graphql(
  gql`
    mutation login($email: String!, $password: String!) {
      login(email: $email, password: $password) {
        token
        user {
          id
          location
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
        },
      };
    },
  }
)(signin);
