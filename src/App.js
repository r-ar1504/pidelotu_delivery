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
import ActiveOrder from './screens/ActiveOrder/ActiveOrder'
import Orders from './screens/Orders/Orders'
import Stripe from './screens/Stripe/Stripe'

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
  },
  ActiveOrder:{
    screen: ActiveOrder
  },
    Orders:{
    screen: Orders
  },
  Stripe:{
    screen: Stripe
  }
},

  {
    initialRouteName: 'Home',
    contentComponent: DrawMenu,
    drawerBackgroundColor: 'rgba(0, 0, 0, 0)'
  }//Stack Options
);


const LoginStack = StackNavigator({
  Login:{
    screen: Login 
  },
  Splash:{
    screen: Splash
  }
  },
  {
  initialRouteName: 'Login',
  headerMode: 'none'
  }
);

/*-----------------------------------------------------------------
* Main Stack Navigator: Splash, Login                             |
*-----------------------------------------------------------------*/
export default StackNavigator({
  HomeDrawer:{
    screen: HomeDrawer
  },
  LoginStack:{
    screen: LoginStack
  },
  ActiveOrder:{
    screen: ActiveOrder
  }
},
  {
    initialRouteName: 'LoginStack',
    headerMode: 'none'
  }
);