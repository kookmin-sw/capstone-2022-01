import React from "react";
import { StyleSheet, ScrollView, View, Text } from "react-native";
import ItemCard from "./ItemCard";
// import { gql, useQuery } from "@apollo/client";
import gql from "graphql-tag";
import { graphql } from "react-apollo";

function showItemCards({ data: { loading, items, variables } }) {
  if (loading) {
    return <Text>loading</Text>;
  } else {
    return (
      <View style={styles.container}>
        <ScrollView>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              paddingTop: 20,
              paddingLeft: 20,
              paddingBottom: 10,
            }}
          >
            <Text style={{ color: "#4080FF", fontSize: 20 }}>
              {variables.location.split(",")[2]}
            </Text>
            <Text style={{ fontSize: 20 }}>{" 주변의 분실물"}</Text>
          </View>
          {items.map((item, index) => {
            return <ItemCard item={item} key={index} />;
          })}
        </ScrollView>
      </View>
    );
  }
}

export default graphql(
  gql`
    query ($location: String!) {
      items: getStuffByLocation(location: $location) {
        id
      }
    }
  `,
  {
    options: (props) => {
      return {
        variables: {
          location: props.location,
        },
      };
    },
  }
)(showItemCards);

const styles = StyleSheet.create({
  container: {
    display: "flex",
    height: "100%",
  },
});
