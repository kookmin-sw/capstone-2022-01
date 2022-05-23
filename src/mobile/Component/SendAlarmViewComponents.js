import React, { useEffect, useState } from "react";
import { StyleSheet, View, Image, ScrollView } from "react-native";
import { defaultFontText as Text } from "./Text";
import gql from "graphql-tag";
import { graphql } from "react-apollo";
import { WhiteSpace } from "@ant-design/react-native";
import SendAlarmButton from "./SendAlarmButton";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AppLoading from 'expo-app-loading'

function showSendAlarmView({ data: { loading, stuff, variables } }) {
  const [userName, setUserName] = useState("");
  useEffect(async () => {
    await AsyncStorage.getItem("userName").then(setUserName);
  });

  const finishSendAlarm = () => {
    variables.onChangeTab("Main");
  };

  if (loading) {
    return <AppLoading />;
  } else if (stuff.postedBy.id === variables.userId) {
    return (
      <View>
        <WhiteSpace style={{ height: "20%" }} />
        <Text style={styles.info}>
          {"해당 물건은 고객님의 " + stuff.title + "입니다."}
        </Text>
        <Image source={{ uri: stuff.imageUrl }} style={styles.image} />
      </View>
    );
  } else if (stuff.status !== "Finding") {
    return (
      <View>
        <WhiteSpace style={{ height: "50%" }} />
        <Text style={styles.info}>
          {"해당 물건은 현재 분실 신고가 된 물건이 아닙니다."}
        </Text>
      </View>
    );
  } else {
    return (
      <ScrollView style={styles.container}>
        <WhiteSpace style={{ height: "20%" }} />
        <Text style={styles.info}>
          {"해당 물건은 " +
            stuff.postedBy.name +
            "님이 찾고 계신 " +
            stuff.title +
            "입니다."}
        </Text>
        <Image source={{ uri: stuff.imageUrl }} style={styles.image} />
        <WhiteSpace style={{ height: "7%" }} />
        <Text style={styles.info}>
          {"분실 추정 위치 : " +
            stuff.location.split(",")[0] +
            " " +
            stuff.location.split(",")[1] +
            " " +
            stuff.location.split(",")[2]}
        </Text>
        <WhiteSpace style={{ height: "5%" }} />
        <Text style={styles.info}>
          {"사례금 : " +
            stuff.reward.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") +
            " 원"}
        </Text>
        <WhiteSpace style={{ height: "10%" }} />
        <SendAlarmButton
          text={
            userName +
            "님이 " +
            stuff.title +
            " 물건을 찾았다고 알림이 도착했습니다!"
          }
          stuffId={parseInt(stuff.id)}
          targetUserId={parseInt(stuff.postedBy.id)}
          finishSendAlarm={finishSendAlarm}
        />
      </ScrollView>
    );
  }
}

export default graphql(
  gql`
    query ($id: Int!) {
      stuff: getStuffById(id: $id) {
        id
        title
        status
        reward
        imageUrl
        location
        postedBy {
          id
          name
        }
      }
    }
  `,
  {
    options: (props) => {
      return {
        variables: {
          id: props.stuffId,
          userId: props.userId,
          onChangeTab: props.onChangeTab,
        },
      };
    },
  }
)(showSendAlarmView);

const styles = StyleSheet.create({
  container: {
    display: "flex",
    height: "100%",
  },
  info: {
    fontSize: 20,
    marginLeft: "10%",
    width: "80%",
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 15,
    marginTop: 30,
    alignSelf: "center",
  },
});
