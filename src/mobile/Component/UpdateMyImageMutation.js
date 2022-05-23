import React from "react";
import { View } from "react-native";
import { graphql } from "react-apollo";
import { gql } from "graphql-tag";

function updateMyImage({ mutate, imageUrl, uploaded, finishUpdate }) {
  if (imageUrl !== null && uploaded) {
    mutate()
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.error(error);
      })
      .then(() => finishUpdate());
  }
  return <View />;
}

export default graphql(
  gql`
    mutation ($imageUrl: String!) {
      update: updateMyImageurl(imageUrl: $imageUrl) {
        id
        imageUrl
      }
    }
  `,
  {
    options: (props) => {
      return {
        variables: {
          imageUrl: props.imageUrl,
          uploaded: props.uploaded,
        },
      };
    },
  }
)(updateMyImage);
