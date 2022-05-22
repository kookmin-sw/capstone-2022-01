import React from "react";
import { StyleSheet, View, Image } from "react-native";
import gql from "graphql-tag";
import SERVER_URI from "../constants/SERVER_URI";
import { graphql } from "react-apollo";

function showChattingThumbnail({ data: { loading, stuff } }) {
  if (loading) {
    return <View />;
  } else {
    return <Image source={{ uri: stuff.imageUrl }} style={styles.itemImage} />;
  }
}

export default graphql(
  gql`
    query ($id: Int!) {
      stuff: getStuffById(id: $id) {
        imageUrl
      }
    }
  `,
  {
    options: (props) => {
      return {
        variables: {
          id: props.id,
        },
      };
    },
  }
)(showChattingThumbnail);

const styles = StyleSheet.create({
  itemImage: {
    width: 70,
    height: 70,
    borderRadius: 7,
    overflow: "hidden",
    marginTop: 5,
  },
});
