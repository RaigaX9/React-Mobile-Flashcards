import React, { Component }  from 'react';
import { StyleSheet, View } from 'react-native';
import { StackNavigator, TabNavigator } from 'react-navigation';
import { Ionicons } from '@expo/vector-icons';
import ListOfCardDeck from './components/ListOfCardDeck';
import Statusbar from './components/Statusbar';
import CardDeckInfo from './components/CardDeckInfo';
import AddDeck from './components/AddDeck';
import AddCard from './components/AddCard';
import Questions from './components/Questions';
import Results from './components/Results';
import { createLocNotification } from './utils/Notification';


const NavTabs = TabNavigator({
    ListOfCardDeck: {
        screen: ListOfCardDeck,
        navigationOptions: {
            tabBarIcon: ({ tintColor }) => <Ionicons name='logo-buffer' size={20} color={tintColor} />
        },
    },
    AddDeck: {
        screen: AddDeck,
        navigationOptions: {
            tabBarIcon: ({ tintColor }) => <Ionicons name='md-add' size={20} color={tintColor} />
        },
    }
},
    {
        navigationOptions: {
            header: null
        },
        tabBarOptions: {
            showLabel: false,
            showIcon: true,
            style: {
              height: 49,
              backgroundColor: '#539FD1'
            }
        }
    }
);

const Nav = StackNavigator({
    Home: {
        screen: NavTabs
    },
    CardDeckInfo: {
        screen: CardDeckInfo,
        navigationOptions: {
            headerTintColor: '#FFFFFF',
            headerStyle: {
                backgroundColor: '#539FD1',
            }
        },
   },
    AddCard: {
        screen: AddCard,
        navigationOptions: {
            headerTintColor: '#FFFFFF',
            headerStyle: {
                backgroundColor: '#539FD1',
            }
        }
    },
    Questions: {
        screen: Questions,
        navigationOptions: {
            headerTintColor: '#FFFFFF',
            headerStyle: {
                backgroundColor: '#539FD1',
            }
        },
   },
   Results: {
        screen: Results,
        navigationOptions: {
            headerTintColor: '#FFFFFF',
            headerStyle: {
                backgroundColor: '#539FD1',
            }
        }
   },

}, {
    navigationOptions: {
        headerStyle: { paddingBottom : 20 }
    }
});


export default class App extends Component {

  componentDidMount(){
    createLocNotification()
  }

  render() {
    return (
      <View style={{flex: 1}}>
          <Statusbar />
          <Nav />
      </View>
    );
  }
}
