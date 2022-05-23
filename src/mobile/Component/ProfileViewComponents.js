import React, { useState, useEffect } from "react";
import { StyleSheet, View, Image, TouchableOpacity } from "react-native";
import { defaultFontText as Text } from "./Text";
import gql from "graphql-tag";
import { graphql } from "react-apollo";
import { Flex, Button } from "@ant-design/react-native";
import Icon from "react-native-vector-icons/Ionicons";
import * as ImagePicker from "expo-image-picker";
import { ReactNativeFile } from "apollo-upload-client/public";
import * as mime from "react-native-mime-types";
import UploadImageMutation from "./UploadImageMutation";
import SERVER_URI from "../constants/SERVER_URI";
import UpdateMyImageMutation from "./UpdateMyImageMutation";
import AppLoading from 'expo-app-loading'

function showProfile({ data: { loading, profile, variables, refetch } }) {
  const [imageUrl, setImageUrl] = useState(null);
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState(null);
  const [uploaded, setUploaded] = useState(false);

  useEffect(async () => {
    if (!loading) {
      setImageUrl(() => profile.imageUrl);
    }
  }, [loading]);

  const addImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.cancelled) {
      let data = new ReactNativeFile({
        uri: result.uri,
        type: mime.lookup(result.uri) || "image",
        name: result.uri,
      });

      setImageUrl(result.uri);
      setFile(data);
    }
  };

  if (loading) {
    return <AppLoading />;
  } else {
    return (
      <View style={styles.container}>
        <Flex style={{ height: "20%" }}>
          <Flex.Item flex={1}>
            <TouchableOpacity onPress={addImage}>
              {imageUrl === null ? (
                <Icon
                  name="person-circle-outline"
                  size={130}
                  style={{ overflow: "hidden", color: "grey", marginLeft: 10 }}
                />
              ) : (
                <Image
                  source={{ uri: imageUrl }}
                  style={{
                    width: 110,
                    height: 110,
                    borderRadius: 55,
                    marginLeft: 20,
                  }}
                />
              )}
            </TouchableOpacity>
            <UploadImageMutation
              file={file}
              uploaded={uploaded}
              finishUpload={(name) => {
                setFileName(name);
                setUploaded(true);
              }}
            />
            <UpdateMyImageMutation
              uploaded={uploaded}
              imageUrl={fileName !== null ? SERVER_URI + fileName : null}
              finishUpdate={() => {
                setFile(null);
                setFileName(null);
                setUploaded(false);
                refetch();
              }}
            />
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
