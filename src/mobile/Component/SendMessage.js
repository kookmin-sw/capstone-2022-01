import React from "react";
import { graphql } from "react-apollo";
import { gql } from "graphql-tag";
import { View } from "react-native";

function sendMessage({ mutate, sendMessage, finishSendMessage }) {
  if (sendMessage) {
    mutate()
      .then((result) => {
        if (result) {
          finishSendMessage();
          sendMessage = false;
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }
  return <View />;
}

export default graphql(
  gql`
    mutation ($chatId: Int!, $text: String!) {
      message: sendMessage(chatId: $chatId, text: $text) {
        id
        text
      }
    }
  `,
  {
    options: (props) => {
      return {
        variables: {
          chatId: props.chatId,
          text: props.text,
        },
      };
    },
  }
)(sendMessage);
