import React from "react";
import { graphql } from "@apollo/client/react/hoc";
import { Button } from "@ant-design/react-native";
import { gql } from "graphql-tag";

function signin({ mutate, finishSignin }) {
  let token = null;
  let userId = null;
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
            }
          })
          .catch((error) => {
            console.log(error);
          })
          .then(() => {
            finishSignin(token, userId);
          });
      }}
    >
      Sign In
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
