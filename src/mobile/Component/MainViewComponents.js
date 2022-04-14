import React from 'react'
import { ScrollView } from 'react-native'
import ItemCard from './ItemCard'

export default class MainViewComponents extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      items: [
        {
          image: require('../assets/dummy_data/macbook.png'),
          itemName: '맥북 프로 15인치',
          location: '길음동',
          reward: 150000,
        },
        {
          image: require('../assets/dummy_data/airpods.png'),
          itemName: '에어팟 프로',
          location: '정릉동',
          reward: 20000,
        },
        {
          image: require('../assets/dummy_data/g102.png'),
          itemName: '로지텍 G102 마우스',
          location: '정릉동',
          reward: 10000,
        },
      ],
    }
  }

  render () {
    return (
      <ScrollView>
        {this.state.items.map((item, index) => {
          return <ItemCard item={item} key={index} />;
        })}
      </ScrollView>
    )
  }
}
