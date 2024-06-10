import React, { useState } from 'react';
import { View, Text, Button, TextInput, StyleSheet } from 'react-native';

function AboutScreen({ navigation }) {
  // State for managing TextInput content
  const [feedback, setFeedback] = useState('');

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Discover Fun Places Around You!</Text>
      <Text style={styles.description}>
        This app helps users discover interesting spots and activities around them based solely on their location and preferences.
      </Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your feedback"
        value={feedback}
        onChangeText={setFeedback} // Update the feedback state on text change
      />
      <Button title="Submit Feedback" onPress={() => alert("Feedback Submitted: " + feedback)} />
      <Button title="Go to Home" onPress={() => navigation.navigate('Home')} />
    </View>
  );
}

// Styles for the component
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
