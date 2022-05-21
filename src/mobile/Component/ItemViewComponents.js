import React from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import { defaultFontText as Text } from "./Text";
import CommunicatingItemCard from "../Component/CommunicatingItemCard";
import FindingItemCard from "../Component/FindingItemCard";
import OwnedItemCard from "../Component/OwnedItemCard";
import { Button, Provider } from "@ant-design/react-native";
import gql from "graphql-tag";
import { graphql } from "react-apollo";

function showMyItemCards({ data: { loading, myItems, variables, refetch } }) {
  if (loading) {
    return <Text>loading</Text>;
  } else {
    let communicatingItems = [];
    let findingItems = [];
    let ownedItems = [];
    for (let item of myItems) {
      switch (item.status) {
        case "Communicating":
          communicatingItems.push(item);
          break;
        case "Finding":
          findingItems.push(item);
          break;
        case "Owned":
          ownedItems.push(item);
          break;
      }
    }
    return (
      <Provider style={styles.container}>
        <ScrollView>
          {communicatingItems.length > 0 ? (
            <View>
              <Text style={styles.categoryText}>소통 중</Text>
              {communicatingItems.map((item, index) => {
                return <CommunicatingItemCard item={item} key={index} />;
              })}
            </View>
          ) : (
            <View />
          )}
          {findingItems.length > 0 ? (
            <View>
              <Text style={styles.categoryText}>찾는 중</Text>
              {findingItems.map((item, index) => {
                return <FindingItemCard item={item} key={index} />;
              })}
            </View>
          ) : (
            <View />
          )}
          {ownedItems.length > 0 ? (
            <View>
              <Text style={styles.categoryText}>내 물건</Text>
              {ownedItems.map((item, index) => {
                return <OwnedItemCard item={item} key={index} />;
              })}
            </View>
          ) : (
            <View />
          )}
        </ScrollView>
        <Button
          style={styles.registrationButton}
          onPress={() =>
            variables.navigation.navigate("Registration", {
              onRegistration: refetch,
            })
          }
        >
          <Text style={{ color: "white", fontSize: 30 }}>+</Text>
        </Button>
      </Provider>
    );
  }
}

export default graphql(
  gql`
    query {
      myItems: getMyStuff {
        id
        title
        status
        location
        reward
        imageUrl
        qrcodeUrl
        acquirerId
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
)(showMyItemCards);

const styles = StyleSheet.create({
  container: {
    display: "flex",
    height: "100%",
  },
  categoryText: {
    fontSize: 20,
    marginTop: 15,
    marginLeft: 20,
  },
  registrationButton: {
    height: 60,
    width: 60,
    borderRadius: 30,
    position: "absolute",
    bottom: 105,
    right: 20,
    borderWidth: 0,
    backgroundColor: "#4080FF",
  },
});
