import React from "react";
import { StyleSheet, View } from "react-native";
import { defaultFontText as Text } from "../Component/Text";
import { graphql } from "react-apollo";
import Header from "../Component/Header";
import gql from "graphql-tag";

function showAlarm({ data: { loading, alarms, variables } }) {
  if (loading) {
    return <Text>loading</Text>;
  } else {
    console.log(alarms);
    return (
      <View style={styles.container}>
        <Header isMain={false} navigation={variables.navigation} />
        <Text>AlarmView</Text>
      </View>
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
      }
    }
  `,
  {
    options: (props) => {
      return {
        variables: {
          navigation: props.navigation,
        },
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
