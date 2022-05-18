import React from "react";
import { graphql } from "react-apollo";
import { Button } from "@ant-design/react-native";
import { gql } from "graphql-tag";
import { defaultFontText as Text } from "./Text";

function qrcodeGeneration({ mutate, finishQRcodeGeneration }) {
  let qrcodeUrl = null;
  return (
    <Button
      style={{
        width: 250,
        height: 250,
        alignSelf: "center",
        marginTop: 30,
      }}
      onPress={() => {
        mutate()
          .then((result) => {
            if (result.data.stuff) {
              qrcodeUrl = result.data.stuff.qrcodeUrl;
            }
          })
          .catch((error) => {
            console.log(error);
          })
          .then(() => {
            finishQRcodeGeneration(qrcodeUrl);
          });
      }}
    >
      <Text>생성하기</Text>
    </Button>
  );
}

export default graphql(
  gql`
    mutation ($id: Int!) {
      stuff: qrcodeGenerate(id: $id, size: 500) {
        qrcodeUrl
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
)(qrcodeGeneration);
