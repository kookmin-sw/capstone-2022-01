import React from "react";
import { Image, StyleSheet, View } from "react-native";
import gql from "graphql-tag";
import { graphql } from "react-apollo";
import { Card, Flex } from "@ant-design/react-native";
import { defaultFontText as Text } from "./Text";
import CommunicatingToFindingButton from "./CommunicatingToFindingButton";
import TradeRewardButton from "./TradeRewardButton";

function showChattingItem({ data: { loading, stuff, variables } }) {
  if (loading) {
    return <View />;
  } else {
    return (
      <View>
        <Card style={styles.itemCard}>
          <Card.Body style={styles.itemCardContent}>
            <Flex>
              <Flex.Item flex={1}>
                <Image
                  source={{ uri: stuff.imageUrl }}
                  style={styles.itemImage}
                />
              </Flex.Item>
              <Flex.Item flex={2}>
                <View>
                  <Flex
                    direction="column"
                    style={styles.itemInfo}
                    align="start"
                  >
                    <Flex.Item>
                      <Text style={styles.itemName}>{stuff.title}</Text>
                    </Flex.Item>
                    <Flex.Item>
                      <View style={styles.row}>
                        <Text style={styles.location}>
                          {stuff.location.split(",")[2]} 추정
                        </Text>
                      </View>
                    </Flex.Item>
                    <Flex.Item>
                      <View style={styles.row}>
                        <Text style={styles.reward}>
                          {"사례금 " +
                            stuff.reward
                              .toString()
                              .replace(/\B(?=(\d{3})+(?!\d))/g, ",") +
                            " 원"}
                        </Text>
                      </View>
                    </Flex.Item>
                  </Flex>
                </View>
              </Flex.Item>
            </Flex>
          </Card.Body>
        </Card>
        {stuff.postedBy.id === variables.userId ? (
          <Flex>
            <Flex.Item>
              <TradeRewardButton
                id={stuff.id}
                navigation={variables.navigation}
              />
            </Flex.Item>
            <Flex.Item>
              <CommunicatingToFindingButton
                id={stuff.id}
                navigation={variables.navigation}
                chattingRefetch={variables.chattingRefetch}
              />
            </Flex.Item>
          </Flex>
        ) : (
          <View />
        )}
      </View>
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
        location
        reward
        imageUrl
        qrcodeUrl
        acquirerId
        postedBy {
          id
        }
      }
    }
  `,
  {
    options: (props) => {
      return {
        variables: {
          id: props.id,
          navigation: props.navigation,
          chattingRefetch: props.chattingRefetch,
          userId: props.userId,
        },
      };
    },
  }
)(showChattingItem);

const styles = StyleSheet.create({
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
  itemName: {
    marginTop: 5,
    fontSize: 18,
  },
  itemInfo: {
    height: 100,
  },
  location: {
    marginTop: 3,
    color: "grey",
  },
  reward: {
    marginTop: 2,
    fontSize: 14,
  },
});
