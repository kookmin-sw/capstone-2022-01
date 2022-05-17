import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

import MainView from "./View/MainView";
import AlarmView from "./View/AlarmView";
import RegistrationView from "./View/RegistrationView";
import ChattingView from "./View/ChattingView";
import LocationView from "./View/LocationView";

const Nav = createStackNavigator(
  {
    Main: {
      screen: (props) => (
        <MainView {...props} onSignout={props.screenProps.onSignout} />
      ),
      navigationOptions: {
        cardStyle: {
          backgroundColor: "white",
        },
      },
    },
    Alarm: {
      screen: AlarmView,
      navigationOptions: {
        cardStyle: {
          backgroundColor: "white",
        },
      },
    },
    Registration: {
      screen: RegistrationView,
      navigationOptions: {
        cardStyle: {
          backgroundColor: "white",
        },
      },
    },
    Chatting: {
      screen: ChattingView,
      navigationOptions: {
        cardStyle: {
          backgroundColor: "white",
        },
      },
    },
    Location: {
      screen: LocationView,
      navigationOptions: {
        cardStyle: {
          backgroundColor: "white",
        },
      },
    },
  },
  {
    initialRouteName: "Main",
    headerMode: "none",
  }
);

const AppNavigator = createAppContainer(Nav);
export default AppNavigator;
