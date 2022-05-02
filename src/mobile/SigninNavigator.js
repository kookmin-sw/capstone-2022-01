import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'

import SigninView from './View/SigninView'
import SignupView from './View/SignupView'
import LocationView from './View/LocationView'

const Nav = createStackNavigator({
    Signin: {
      screen: SigninView,
      navigationOptions: {
        cardStyle: {
          backgroundColor: 'white'
        }
      }
    },
    Signup: {
      screen: SignupView,
      navigationOptions: {
        cardStyle: {
          backgroundColor: 'white'
        }
      }
    },
    Location: {
      screen: LocationView,
      navigationOptions: {
        cardStyle: {
          backgroundColor: 'white'
        }
      }
    }
  },
  {
    initialRouteName: 'Signin',
    headerMode: 'none'
  }
)

const AppNavigator = createAppContainer(Nav)
export default AppNavigator
