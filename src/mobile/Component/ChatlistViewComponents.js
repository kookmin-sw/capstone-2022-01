import React from "react";
import { ScrollView } from "react-native";
import gql from "graphql-tag";
import { graphql } from "react-apollo";
import ChattingCard from "./ChattingCard";
import AppLoading from "expo-app-loading";

function showMyChatlist({ data: { loading, myChats, variables, refetch } }) {
  if (loading) {
    return <AppLoading />;
  } else {
    return (
      <ScrollView>
        {myChats.map((chatting) => {
          return (
            <ChattingCard
              chatting={chatting}
              key={chatting.id}
              navigation={variables.navigation}
              userId={variables.userId}
              refetch={refetch}
            />
          );
        })}
      </ScrollView>
    );
  }
}

export default graphql(
  gql`
    query {
      myChats: getMyChats {
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
          userId: props.userId,
        },
        fetchPolicy: "cache-and-network",
      };
    },
  }
)(showMyChatlist);
