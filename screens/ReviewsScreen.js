import React, { useContext, useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import { Rating } from 'react-native-ratings';
import UserContext from './UserContext';

function ReviewsScreen() {
  const [reviewText, setReviewText] = useState('');
  const [rating, setRating] = useState(3);  // Starts with a default rating of 3
  const { addReview } = useContext(UserContext);

  const handleAddReview = () => {
    addReview({
      text: reviewText,
      rating: rating,  // Include the rating in your review object
      date: new Date().toISOString(),
    });
    setReviewText('');  // Clear input after submission
    alert('Review added!');
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Write a review..."
        value={reviewText}
        onChangeText={setReviewText}
        multiline
      />
      <Rating
        showRating
        onFinishRating={setRating}
        style={{ paddingVertical: 10 }}
      />
      <Button title="Submit Review" onPress={handleAddReview} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  input: {
    height: 100,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  }
});

export default ReviewsScreen;
