import { createSwitchNavigator, createAppContainer } from "react-navigation";

import MainView from "./View/MainView";
import ItemView from "./View/ItemView";
import ChatlistView from "./View/ChatlistView";
import ProfileView from "./View/ProfileView";
import AlarmView from "./View/AlarmView";
import RegistrationView from "./View/RegistrationView";
import ChattingView from "./View/ChattingView";

const Nav = createSwitchNavigator({
  Main: {
    screen: MainView,
    navigateOptions: {
      header: null,
    },
  },
  Item: {
    screen: ItemView,
    navigateOptions: {
      header: null,
    },
  },
  Chatlist: {
    screen: ChatlistView,
    navigateOptions: {
      header: null,
    },
  },
  Profile: {
    screen: ProfileView,
    navigateOptions: {
      header: null,
    },
  },
  Alarm: {
    screen: AlarmView,
    navigateOptions: {
      header: null,
    },
  },
  Registration: {
    screen: RegistrationView,
    navigateOptions: {
      header: null,
    },
  },
  Chatting: {
    screen: ChattingView,
    navigateOptions: {
      header: null,
    },
  },
});

const AppNavigator = createAppContainer(Nav);
export default AppNavigator;
