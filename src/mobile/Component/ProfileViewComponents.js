import React from "react";
import { StyleSheet, View, Image } from "react-native";
import { defaultFontText as Text } from "./Text";
import gql from "graphql-tag";
import { graphql } from "react-apollo";
import { Flex, Button } from "@ant-design/react-native";
import Icon from "react-native-vector-icons/Ionicons";

function showProfile({ data: { loading, profile, variables } }) {
  if (loading) {
    return <Text>loading</Text>;
  } else {
    return (
      <View style={styles.container}>
        <Flex style={{ height: "20%" }}>
          <Flex.Item flex={1}>
            {profile.imageUrl === "" ? (
              <Icon
                name="person-circle-outline"
                size={130}
                style={styles.icon}
              />
            ) : (
              <Image source={{ uri: profile.imageUrl }} />
            )}
          </Flex.Item>
          <Flex.Item flex={2}>
            <View style={styles.info}>
              <Text style={styles.name}>{profile.name}</Text>
              <Text style={styles.pointAmount}>
                {"보유 포인트 : " +
                  profile.point
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",") +
                  " 원"}
              </Text>
            </View>
          </Flex.Item>
        </Flex>
        <Button
          style={{ width: "70%", alignSelf: "center", marginTop: 20 }}
          onPress={() => variables.onSignout()}
        >
          <Text style={{ color: "red" }}>Sign out</Text>
        </Button>
      </View>
    );
  }
}

export default graphql(
  gql`
    query {
      profile: getMyProfile {
        id
        name
        point
        imageUrl
      }
    }
  `,
  {
    options: (props) => {
      return {
        variables: {
          onSignout: props.onSignout,
        },
      };
    },
  }
)(showProfile);

const styles = StyleSheet.create({
  container: {
    display: "flex",
    height: "100%",
  },
  icon: {
    overflow: "hidden",
    color: "grey",
    marginLeft: 10,
  },
  info: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    height: "100%",
  },
  name: {
    color: "#4080FF",
    fontSize: 30,
    marginTop: 20,
    marginLeft: 20,
  },
  pointAmount: {
    marginBottom: 20,
    marginTop: -20,
    marginLeft: 20,
    fontSize: 17,
  },
});
