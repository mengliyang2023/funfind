import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userName, setUserName] = useState('Guest');
  const [reviews, setReviews] = useState([]);
  const [topRatedPlaces, setTopRatedPlaces] = useState([]);
  const [topRatedReview, setTopRatedReview] = useState(null);  // State to hold the top-rated review

  // Load initial data from AsyncStorage when the app starts
  useEffect(() => {
    const loadData = async () => {
      try {
        const storedUserName = await AsyncStorage.getItem('userName');
        if (storedUserName) setUserName(storedUserName);
  
        const storedReviews = await AsyncStorage.getItem('reviews');
        if (storedReviews) setReviews(JSON.parse(storedReviews));
  
        const storedTopRatedPlaces = await AsyncStorage.getItem('topRatedPlaces');
        if (storedTopRatedPlaces) setTopRatedPlaces(JSON.parse(storedTopRatedPlaces));
  
        const storedTopRatedReview = await AsyncStorage.getItem('topRatedReview');
        if (storedTopRatedReview) setTopRatedReview(JSON.parse(storedTopRatedReview));
      } catch (error) {
        console.error('Failed to load data from AsyncStorage:', error);
      }
    };
  
    loadData();
  }, []);

  // Save data whenever it changes
  useEffect(() => {
    AsyncStorage.setItem('userName', userName);
    AsyncStorage.setItem('reviews', JSON.stringify(reviews));
    AsyncStorage.setItem('topRatedPlaces', JSON.stringify(topRatedPlaces));
    AsyncStorage.setItem('topRatedReview', JSON.stringify(topRatedReview)); // Save top-rated review
  }, [userName, reviews, topRatedPlaces, topRatedReview]);

  // Add a new review and update top-rated review if necessary
  const addReview = (review) => {
    setReviews(prevReviews => {
      const newReviews = [...prevReviews, review];
      AsyncStorage.setItem('reviews', JSON.stringify(newReviews)); // Save all reviews

      // Check and update top-rated review if the new review is higher rated
      if (!topRatedReview || review.rating > topRatedReview.rating) {
        setTopRatedReview(review);
        AsyncStorage.setItem('topRatedReview', JSON.stringify(review)); // Save new top-rated review
      }
      return newReviews;
    });
  };

  // Clear the top-rated review
  const clearTopRatedReview = () => {
    setTopRatedReview(null);
    AsyncStorage.removeItem('topRatedReview');
  };

  const value = {
    userName,
    setUserName,
    reviews,
    addReview,
    topRatedPlaces,
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
