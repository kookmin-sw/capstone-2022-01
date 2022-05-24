import React from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import { graphql } from "react-apollo";
import Header from "../Component/Header";
import gql from "graphql-tag";
import AlarmCard from "../Component/AlarmCard";
import { Provider } from "@ant-design/react-native";
import AppLoading from "expo-app-loading";

function showAlarm({ data: { loading, alarms, variables } }) {
  if (loading) {
    return <AppLoading />;
  } else {
    return (
      <Provider style={styles.container}>
        <Header isMain={false} navigation={variables.navigation} />
        <ScrollView style={{ marginTop: 10 }}>
          {alarms.length > 0 ? (
            alarms.map((alarm) => {
              return <AlarmCard alarm={alarm} key={alarm.id} />;
            })
          ) : (
            <View />
          )}
        </ScrollView>
      </Provider>
    );
  }
}

export default graphql(
  gql`
    query {
      alarms: getMyAlarms {
        id
        text
        targetUserId
        stuffId
        owner {
          id
        }
      }
    }
  `,
  {
    options: (props) => {
      return {
        variables: {
          navigation: props.navigation,
        },
        fetchPolicy: "network-only",
      };
    },
  }
)(showAlarm);

const styles = StyleSheet.create({
  container: {
    display: "flex",
    height: "100%",
  },
});
