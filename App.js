import React from 'react'
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native'

'react-native/Libraries/NewAppScreen'

import Users from './src/Users'
import UserProfile from './src/UserProfile'
import UserDetail from './src/UserDetail'

import { store } from './src/store'
import {Provider} from 'react-redux'

import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import Icon from 'react-native-vector-icons/Ionicons'

import {Button} from 'native-base'

import {TouchableOpacity} from 'react-native'

const App = () => {
  const isDarkMode = useColorScheme() === 'dark'

  const Stack = createStackNavigator()

  const optionsUserProfile = (props) => {
    return {
      headerTitle: "",
      headerLeft: () => (
        <TouchableOpacity
          onPress={() => props.navigation.goBack()}
          style={{width: 44, height: 44, alignItems: 'center', justifyContent: 'center', marginLeft: 4}}
        >
          <Icon name="arrow-back-outline" size={26} color="#333" />
        </TouchableOpacity>
      )
    }
  }

  const optionsUsers = () => {
    return {
      headerTitle: ""
    }
  }

  return (
    <>
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Users" component={Users} options={optionsUsers} />
            <Stack.Screen name="UserProfile" component={UserProfile} options={optionsUserProfile} />
            <Stack.Screen name="UserDetail" component={UserDetail} options={optionsUserProfile} />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    </>
  )
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
