import React from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import Header from "../Component/Header";
import Footer from "../Component/Footer";
import ItemCard from "../Component/ItemCard";

export default class MainView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [
        {
          image: require("../assets/dummy_data/macbook.png"),
          itemName: "맥북 프로 15인치",
          location: "길음동",
          reward: 150000,
        },
        {
          image: require("../assets/dummy_data/airpods.png"),
          itemName: "에어팟 프로",
          location: "정릉동",
          reward: 20000,
        },
        {
          image: require("../assets/dummy_data/g102.png"),
          itemName: "로지텍 G102 마우스",
          location: "정릉동",
          reward: 10000,
        },
      ],
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <Header />
        <ScrollView>
          {this.state.items.map((item, index) => {
            return <ItemCard item={item} key={index} />;
          })}
        </ScrollView>
        <Footer navigation={this.props.navigation} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    height: "100%",
  },
});
