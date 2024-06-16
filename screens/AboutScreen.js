import React, { useContext } from 'react';
import { View, Text, Button, TextInput, StyleSheet } from 'react-native';
import UserContext from './UserContext'; // Import the context

function AboutScreen({ navigation }) {
  const { userName, setUserName } = useContext(UserContext); // Use context

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Discover Fun Places Around You!</Text>
      <Text style={styles.description}>
        This app helps users discover interesting spots and activities around them based solely on their location and preferences.
      </Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your name"
        value={userName}
        onChangeText={text => setUserName(text)} // Update the user name on text change
      />
      <Button title="Update Name" onPress={() => alert("Name Updated: " + userName)} />
      <Button title="Go to Home" onPress={() => navigation.navigate('Home')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    fontSize: 24,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    height: 40,
    width: '100%',
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  }
});

export default AboutScreen;



