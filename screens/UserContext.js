import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  // State to hold all the variables.
  const [userName, setUserName] = useState('Guest');
  const [reviews, setReviews] = useState([]);
  const [topRatedPlaces, setTopRatedPlaces] = useState([]);
  const [topRatedReview, setTopRatedReview] = useState([]);

  // Load initial data from AsyncStorage when the app starts
  useEffect(() => {
    const loadData = async () => {
        try {
            const storedUserName = await AsyncStorage.getItem('userName');
            const storedReviews = await AsyncStorage.getItem('reviews');
            const storedTopRatedReview = await AsyncStorage.getItem('topRatedReview');

            if (storedUserName) setUserName(storedUserName);
            if (storedReviews) setReviews(JSON.parse(storedReviews));
            if (storedTopRatedReview) {
              const parsedReviews = JSON.parse(storedTopRatedReview);
              setTopRatedReview(Array.isArray(parsedReviews) ? parsedReviews : [parsedReviews]);
          }
            console.log('Data successfully loaded from AsyncStorage');
        } catch (error) {
            console.error('Failed to load data from AsyncStorage:', error);
        }
    };
    loadData();
}, []);


  // Save data whenever it changes
  useEffect(() => {
    const saveData = async () => {
      try {
        await AsyncStorage.setItem('userName', userName);
        await AsyncStorage.setItem('reviews', JSON.stringify(reviews));
        await AsyncStorage.setItem('topRatedPlaces', JSON.stringify(topRatedPlaces));
        await AsyncStorage.setItem('topRatedReview', JSON.stringify(topRatedReview));

        console.log('Data successfully saved to AsyncStorage');
      } catch (error) {
        console.error('Failed to save data to AsyncStorage:', error);
      }
    };
    saveData();
  }, [userName, reviews, topRatedPlaces, topRatedReview]);

// Add a new review and update top-rated review if necessary
const addReview = async (review) => {
  try {
      const updatedReviews = [...reviews, review];
      await AsyncStorage.setItem('reviews', JSON.stringify(updatedReviews));
      setReviews(updatedReviews); // Update state to trigger re-render

      // Determine if this review matches or exceeds the highest rating
      if (!topRatedReview.length || review.rating > topRatedReview[0].rating) {
          setTopRatedReview([review]); // Start a new array with the new top review
          await AsyncStorage.setItem('topRatedReview', JSON.stringify([review]));
      } else if (review.rating === topRatedReview[0].rating) {
          const updatedTopReviews = [...topRatedReview, review];
          setTopRatedReview(updatedTopReviews); // Add to the existing top reviews
          await AsyncStorage.setItem('topRatedReview', JSON.stringify(updatedTopReviews));
      }
  } catch (error) {
      console.error('Failed to save review or update top rated reviews:', error);
  }
};


  // Clear the top-rated review
  const clearTopRatedReview = async () => {
    try {
      setTopRatedReview(null);
      await AsyncStorage.removeItem('topRatedReview');
      console.log('Top rated review cleared from AsyncStorage');
    } catch (error) {
      console.error('Failed to clear top-rated review from AsyncStorage:', error);
    }
  };

  const value = {
    userName,
    setUserName,
    reviews,
    addReview,
    // topRatedPlaces,
    topRatedReview,
    clearTopRatedReview
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
