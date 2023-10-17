/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';

import {Provider} from 'react-redux';
import store from './redux/store/store';
import {ExchangeRatesScreen} from './screens';

import {NavigationContainer} from '@react-navigation/native';
// import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Dashboard from './screens/Dashboard/Dashboard.screen';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {DashboardIcon} from '@components/atoms';
import ExchangeRatesIcon from '@components/atoms/Icons/ExchangeRate.icon';

// const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function App(): JSX.Element {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen
            name="Dashboard"
            component={Dashboard}
            options={{
              tabBarIcon: () => <DashboardIcon color="black" size={10} />,
              tabBarIconStyle: {marginTop: 2},
              tabBarLabelStyle: {color: 'black'},
              headerShown: false,
            }}
          />
          <Tab.Screen
            name="ExchangeScreen"
            component={ExchangeRatesScreen}
            options={{
              tabBarIcon: () => <ExchangeRatesIcon color="black" size={10} />,
              tabBarIconStyle: {marginTop: 2},
              tabBarLabelStyle: {color: 'black'},
              tabBarLabel: 'Exchange Rates',
              headerShown: false,
            }}
          />
          {/* <Tab.Screen name="Settings" component={SettingsScreen} /> */}
        </Tab.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

export default App;
