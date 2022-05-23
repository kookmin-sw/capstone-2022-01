import React, { useState } from "react";
import { StyleSheet, View, Image, TouchableOpacity } from "react-native";
import { defaultFontText as Text } from "./Text";
import { Card, Flex, Button } from "@ant-design/react-native";
import { graphql } from "react-apollo";
import gql from "graphql-tag";
import Icon from "react-native-vector-icons/Ionicons";
import QRcodeImageModal from "./QRcodeImageModal";
import CommunicatingToFindingButton from "./CommunicatingToFindingButton";
import CommunicatingToOwnedButton from "./CommunicatingToOwnedButton";

function showCommunicatingItemCard({ data: { loading, user, variables } }) {
  const [qrModalVisible, setQrModalVisible] = useState(false);

  if (loading) {
    return <Text>loading</Text>;
  } else {
    return (
      <View>
        <Card style={styles.itemCard}>
          <Card.Body style={styles.itemCardContent}>
            <Flex>
              <Flex.Item flex={4}>
                <Image
                  source={{ uri: variables.imageUrl.toString() }}
                  style={styles.itemImage}
                />
              </Flex.Item>
              <Flex.Item flex={6}>
                <View>
                  <Flex
                    direction="column"
                    style={styles.itemInfo}
                    align="start"
                  >
                    <Flex.Item>
                      <Text style={styles.itemName}>{variables.title}</Text>
                    </Flex.Item>
                    <Flex.Item>
                      <View style={styles.row}>
                        <Text style={styles.location}>
                          {variables.location.split(",")[2]} 추정
                        </Text>
                        <Button size="small">변경</Button>
                      </View>
                    </Flex.Item>
                    <Flex.Item>
                      <View style={styles.row}>
                        <Text style={styles.reward}>
                          {"사례금 " +
                            variables.reward
                              .toString()
                              .replace(/\B(?=(\d{3})+(?!\d))/g, ",") +
                            " 원"}
                        </Text>
                      </View>
                    </Flex.Item>
                    <Flex.Item>
                      <Text style={styles.reward}>
                        {user.name + "님과 대화중"}
                      </Text>
                    </Flex.Item>
                  </Flex>
                </View>
              </Flex.Item>
              <Flex.Item flex={1}>
                <TouchableOpacity onPress={() => setQrModalVisible(true)}>
                  <Icon name="qr-code" size={20} />
                </TouchableOpacity>
              </Flex.Item>
            </Flex>
            <Flex direction="row">
              <Flex.Item flex={1}>
                <CommunicatingToFindingButton
                  id={variables.stuffId}
                  refetch={variables.refetch}
                />
              </Flex.Item>
              <Flex.Item flex={1}>
                <CommunicatingToOwnedButton
                  id={variables.stuffId}
                  refetch={variables.refetch}
                />
              </Flex.Item>
            </Flex>
          </Card.Body>
        </Card>
        <QRcodeImageModal
          qrModalVisible={qrModalVisible}
          closeQRModal={() => setQrModalVisible(false)}
          qrcodeUrl={variables.qrcodeUrl}
        />
      </View>
    );
  }
}

export default graphql(
  gql`
    query ($id: Int!) {
      user: getUserProfile(userid: $id) {
        name
      }
    }
  `,
  {
    options: (props) => {
      return {
        variables: {
          id: props.item.acquirerId,
          title: props.item.title,
          location: props.item.location,
          imageUrl: props.item.imageUrl,
          qrcodeUrl: props.item.qrcodeUrl,
          reward: props.item.reward,
          stuffId: props.item.id,
          refetch: props.refetch,
        },
      };
    },
  }
)(showCommunicatingItemCard);

const styles = StyleSheet.create({
  container: {
    display: "flex",
    height: "100%",
  },
  itemCard: {
    borderWidth: 0,
  },
  itemCardContent: {
    borderTopWidth: 0,
    borderBottomWidth: 0.5,
  },
  itemImage: {
    width: 100,
    height: 100,
    borderRadius: 7,
    overflow: "hidden",
    marginTop: 5,
    marginLeft: 10,
  },
  itemInfo: {
    height: 130,
  },
  itemName: {
    marginTop: 5,
    fontSize: 18,
  },
  location: {
    marginTop: 3,
    color: "grey",
    marginRight: 10,
  },
  reward: {
    marginTop: 2,
    fontSize: 14,
    marginRight: 10,
  },
  row: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
});
