import React from 'react';
import { View, Text } from 'react-native';
import { StyleSheet } from 'react-native';


const styles = StyleSheet.create({
  titleText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },
  contentText: {
    fontSize: 16,
    color: '#666',
    marginTop: 5,
    lineHeight: 24,
    textAlign: 'center',
  }
});

function AboutScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>Welcome to FunFind, Discover Places Around You !</Text>
      <Text style={styles.contentText}>
        Explore historical sites, parks, and exciting dining spots all tailored to your preferences!
      </Text>
    </View>
  );
}

export default AboutScreen;
