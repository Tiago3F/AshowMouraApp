import React, { Component } from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator, DrawerActions } from 'react-navigation-drawer';
import { createAppContainer } from 'react-navigation';

import SignIn from './pages/signIn';
import SignUp from './pages/signUp';
import Main from './pages/main';
import SideMenu from './pages/SideMenu/SideMenu';
import CreateAShow from './pages/ashow/createAShow';
import AShowsClose from './pages/ashow/ashowsClose';
import AShowsFiled from './pages/ashow/ashowsFiled';

import { TouchableOpacity, Image, Dimensions, Text, View } from 'react-native';

class NavigationDrawerStructure extends Component {
  
  render() {
    return (
      <TouchableOpacity onPress={() => {
            // Coming soon: navigation.navigate('DrawerToggle')
            // https://github.com/react-community/react-navigation/pull/2492
            if (!this.props.navigationProps.state.isDrawerOpen) {
              this.props.navigationProps.openDrawer();
            } else {
              
              this.props.navigationProps.closeDrawer();
            }
          }}>
            <Image source={require('../src/images/menu.png')} 
                style={{height: 30, width: 30, marginLeft: 10}}/>
    </TouchableOpacity>
    );
  }
}

const navigationOption = ({navigation}) =>({

  headerBackTitle: ' ',
  headerBackTitleVisible:true ,
  headerStyle: {
    backgroundColor: '#4e91bd',
    shadowOpacity: 0.25,
      shadowOffset: {
        height: 1,
      },
      shadowRadius: 5,
  },
  headerTintColor: '#fff',
  headerTitleStyle: {
      fontSize: 18,
      fontWeight: '500',
  },
});

const MainDrawer = createDrawerNavigator({
    Main: {
      screen: Main,
      navigationOptions: {
        title: 'AShows Abertas'
      }
    },
    
  }, {
  contentComponent: SideMenu
});

const Routes = createStackNavigator({
    SignIn: {
        screen: SignIn
    },
    Main: {
      screen: MainDrawer,
      
    },
    drawerStack: { 
      screen: MainDrawer,
      navigationOptions: ({ navigation }) => ({
        headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
        title: 'AShow Moura',
        headerStyle: {
            backgroundColor: "#008000",
            shadowOpacity: 0.25,
            shadowOffset: {
            height: 1,
            },
            shadowRadius: 5,
        },
        headerTintColor: "#FFF",
        headerTitleStyle: {
            fontSize: 20,
            fontWeight: '900',
        },
      }),
    },
    CreateAShow: {
        screen: CreateAShow
    },
    SignUp: {
        screen: SignUp
    },
    AShowsClose: {
      screen: AShowsClose
    },
    AShowsFiled: {
      screen: AShowsFiled,
    }

    }, {
    initialRouteName: 'SignIn',
    navigationOptions: navigationOption
});

const App = createAppContainer(Routes);

export default App;
