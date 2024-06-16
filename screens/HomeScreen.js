import React, { useContext } from 'react';
import { View, Text, Button, StyleSheet, Platform } from 'react-native';
import UserContext from './UserContext';

function HomeScreen({ navigation }) {
  const { userName } = useContext(UserContext);

  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Welcome {userName}, It's a pleasure to see you here!</Text>
    

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff', 
  },
  welcomeText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  }
});


export default HomeScreen;
