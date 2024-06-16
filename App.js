import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './screens/HomeScreen';
import AboutScreen from './screens/AboutScreen';
import ReviewsScreen from './screens/ReviewsScreen';
import TopRatedPlacesScreen from './screens/TopRatedPlacesScreen';
import { UserProvider } from './screens/UserContext'; // Import the provider

const Tab = createBottomTabNavigator();

function App() {
  return (
    <UserProvider>
      <NavigationContainer>
        <Tab.Navigator
          initialRouteName="Home"
          screenOptions={{
            tabBarActiveTintColor: '#5f9ea0',
            tabBarInactiveTintColor: 'gray',
            headerStyle: { backgroundColor: '#5f9ea0' },
            headerTintColor: '#fff',
            headerTitleStyle: { fontWeight: 'bold' }
          }}
        >
          <Tab.Screen name="Home" component={HomeScreen} options={{ title: 'My Home' }} />
          <Tab.Screen name="About" component={AboutScreen} options={{ title: 'About Us' }} />
          <Tab.Screen name="Reviews" component={ReviewsScreen} options={{ title: 'Reviews' }} />
          <Tab.Screen name="Top Rated Places" component={TopRatedPlacesScreen} options={{ title: 'Top Rated Places' }} />
        </Tab.Navigator>
      </NavigationContainer>
    </UserProvider>
  );
}

export default App;
