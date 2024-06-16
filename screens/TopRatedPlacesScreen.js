import React, { useContext } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import UserContext from './UserContext';

function TopRatedPlacesScreen() {
  const { topRatedPlaces } = useContext(UserContext);

  return (
    <View style={styles.container}>
      <FlatList
        data={topRatedPlaces}
        keyExtractor={item => item.placeId.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.title}>{item.name}</Text> // Displaying the place name
            <Text>{item.rating.toFixed(1)} Stars</Text>
            <Text>{item.reviewCount} Reviews</Text>
          </View>
        )}
      />
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  item: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc'
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  }
});

export default TopRatedPlacesScreen;
