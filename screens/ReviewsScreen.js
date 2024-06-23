import React, { useContext, useState } from 'react';
import { View, TextInput, Button, StyleSheet, Modal, Text, ScrollView } from 'react-native';
import { Rating } from 'react-native-ratings';
import UserContext from './UserContext';

function ReviewsScreen() {
  const [reviewText, setReviewText] = useState('');
  const [rating, setRating] = useState(3);
  const [showReviewsModal, setShowReviewsModal] = useState(false);
  const { addReview, reviews } = useContext(UserContext);

  const handleAddReview = () => {
    addReview({
      text: reviewText,
      rating: rating,
      date: new Date().toISOString(),
    });
    setReviewText(''); // Clear input after submission
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
      <Button title="Show All Reviews" onPress={() => setShowReviewsModal(true)} />

      <Modal
        animationType="slide"
        transparent={true}
        visible={showReviewsModal}
        onRequestClose={() => setShowReviewsModal(false)}
      >
        <View style={styles.modalView}>
          <ScrollView style={styles.scrollView}>
            {reviews.map((review, index) => (
              <View key={index} style={styles.reviewItem}>
                <Text style={styles.reviewText}>{review.text}</Text>
                <Text style={styles.reviewDate}>{review.date}</Text>
                <Text style={styles.reviewRating}>{review.rating} Stars</Text>
              </View>
            ))}
          </ScrollView>
          <Button title="Close" onPress={() => setShowReviewsModal(false)} />
        </View>
      </Modal>
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
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  scrollView: {
    width: '100%',
  },
  reviewItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  reviewText: {
    fontSize: 16,
    color: 'black',
  },
  reviewDate: {
    fontSize: 14,
    color: 'grey',
  },
  reviewRating: {
    fontSize: 14,
    fontWeight: 'bold',
  }
});

export default ReviewsScreen;
