import React, { useContext, useState } from 'react';
import { View, Text, FlatList, Button, StyleSheet } from 'react-native';
import UserContext from './UserContext';

function TopRatedPlacesScreen() {
  const { topRatedPlaces, topRatedReview, clearTopRatedReview } = useContext(UserContext);
  const [showTopReview, setShowTopReview] = useState(false);

  return (
    <View style={styles.container}>
      <FlatList
        data={topRatedPlaces}
        keyExtractor={item => item.placeId.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.title}>{item.name}</Text>
            <Text>{item.rating.toFixed(1)} Stars</Text>
            <Text>{item.reviewCount} Reviews</Text>
          </View>
        )}
      />
      <Button
        title="Show Top Rated Review"
        onPress={() => setShowTopReview(true)}
      />
      {showTopReview && topRatedReview && (
      topRatedReview.map((review, index) => (
        <View key={index}>
            <Text style={styles.reviewTitle}>Top Review:</Text>
            <Text>{review.text}</Text>
            <Text>{review.rating} Stars</Text>
        </View>
    ))
)}


      <Button
        title="Clear"
        onPress={() => {
          clearTopRatedReview();
          setShowTopReview(false);
        }}
      />

      <Button
        title="Go to Home"
        onPress={() => navigation.navigate('Home')}  // Navigate to Home screen
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
  },
  reviewTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 20,
  }
});

export default TopRatedPlacesScreen;
