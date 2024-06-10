import React from 'react';
import { View, Text, Button } from 'react-native';

function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{fontSize: 20, fontWeight: 'bold'}}>Welcome to Funfind, It's a pleasure to see you here!</Text>
      <Text>We can't wait to see your posts and reviews.</Text>
      <Button
        title="Go to About"
        onPress={() => navigation.navigate('About')}
      />
    </View>
  );
}

export default HomeScreen;
