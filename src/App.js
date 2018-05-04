/*-----------------------------------------------------------------
* Default Components                                              |
*-----------------------------------------------------------------*/
import React from 'react';
import { AppRegistry } from 'react-native';
import { StackNavigator, DrawerNavigator } from 'react-navigation';
/*-----------------------------------------------------------------
* Screens for login navigator                                     |
*-----------------------------------------------------------------*/
import Splash from './screens/Splash/Splash';
import Login from './screens/Login/Login';
/*-----------------------------------------------------------------
* Screens for home (Drawer) navigator                             |
*-----------------------------------------------------------------*/
import Home from './screens/Home/Home';
import OrderAlert from './screens/OrderAlert/OrderAlert'
/*-----------------------------------------------------------------
* Drawer Components                                               |
*-----------------------------------------------------------------*/
import DrawMenu from './components/DrawMenu/DrawMenu';



/*----------------- ------------------------------------------------
* Main Drawer Navigator: After  Login                             |
*-----------------------------------------------------------------*/
const HomeDrawer = DrawerNavigator({
  Home:{
    screen: Home
  },
  OrderAlert:{
    screen: OrderAlert
  }
},
  {
    initialRouteName: 'Home',
    contentComponent: DrawMenu,
    drawerBackgroundColor: 'rgba(0, 0, 0, 0)'
  }//Stack Options
);

/*-----------------------------------------------------------------
* Main Stack Navigator: Splash, Login                             |
*-----------------------------------------------------------------*/
export default StackNavigator({
  HomeDrawer:{
    screen: HomeDrawer
  },
  Splash:{
     screen: Splash,
  },
  Login:{
    screen: Login
  }
  },//Screens Definition
  {
  initialRouteName: 'Splash',
  headerMode: 'none'
  }//Stack Options
);
