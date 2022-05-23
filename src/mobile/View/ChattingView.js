import React, { useState, useCallback, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import Header from "../Component/Header";
import ChattingItem from "../Component/ChattingItem";
import SendMessage from "../Component/SendMessage";
import { defaultFontText as Text } from "../Component/Text";
import { graphql } from "react-apollo";
import gql from "graphql-tag";
import { GiftedChat } from "react-native-gifted-chat";

function showChattingView({ data: { loading, chatting, variables, refetch } }) {
  if (loading) {
    return <Text>loading</Text>;
  } else {
    const [sendMessage, setSendMessage] = useState(false);
    const [lastMessage, setLastMessage] = useState("");
    const [messages, setMessages] = useState([]);

    useEffect(() => {
      setMessages(
        chatting.messages.map((message, id) => {
          return {
            _id: id,
            text: message.text,
            createdAt: message.createdAt,
            user: {
              _id: message.fromUserId,
              name:
                message.fromUserId === chatting.host.id
                  ? chatting.host.name
                  : chatting.participant.name,
              avatar:
                message.fromUserId === chatting.host.id
                  ? chatting.host.imageUrl
                  : chatting.participant.imageUrl,
            },
          };
        })
      );
    }, []);

    const onSend = useCallback((messages = []) => {
      setMessages((previousMessages) =>
        GiftedChat.append(previousMessages, messages)
      );
    }, []);

    const finishSendMessage = () => {
      setSendMessage(false);
      setLastMessage("");
      refetch();
    };
    return (
      <View style={styles.container}>
        <Header
          isHome={false}
          navigation={variables.navigation}
          destination={"Chatlist"}
        />
        <ChattingItem
          id={chatting.stuffId}
          navigation={variables.navigation}
          chattingRefetch={variables.chattingRefetch}
          userId={variables.userId}
        />
        <GiftedChat
          messages={messages}
          scrollToBottom={true}
          user={{ _id: parseInt(variables.userId) }}
          inverted={false}
          onSend={(messages) => {
            onSend(messages);
            setSendMessage(true);
          }}
          onInputTextChanged={(message) => {
            if (message !== "") {
              setLastMessage(message);
            }
          }}
        />
        <SendMessage
          chatId={chatting.id}
          text={lastMessage}
          sendMessage={sendMessage}
          finishSendMessage={finishSendMessage}
        />
      </View>
    );
  }
}

export default graphql(
  gql`
    query ($id: Int!) {
      chatting: getChat(id: $id) {
        id
        host {
          id
          name
          imageUrl
        }
        participant {
          id
          name
          imageUrl
        }
        stuffId
        messages {
          id
          text
          fromUserId
          createdAt
        }
        lastConnectHost
        lastConnectParti
      }
    }
  `,
  {
    options: (props) => {
      return {
        variables: {
          navigation: props.navigation,
          id: props.navigation.getParam("id", null),
          userId: props.navigation.getParam("userId", null),
          chattingRefetch: props.navigation.getParam("chattingRefetch", null),
        },
        fetchPolicy: "cache-and-network",
      };
    },
  }
)(showChattingView);

const styles = StyleSheet.create({
  container: {
    display: "flex",
    height: "100%",
  },
});
