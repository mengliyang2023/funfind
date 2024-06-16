import React, { createContext, useState, useEffect } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userName, setUserName] = useState('Guest');
  const [reviews, setReviews] = useState([]);
  const [topRatedPlaces, setTopRatedPlaces] = useState([]);

  const addReview = (review) => {
    // Assuming `review` contains place details such as `placeName` and `placeId`
    setReviews(prevReviews => [...prevReviews, review]);
  };
  
  useEffect(() => {
    const updateTopRatedPlaces = () => {
      const newTopRatedPlaces = reviews.reduce((acc, review) => {
        const existing = acc.find(p => p.placeId === review.placeId);
        if (existing) {
          // Updating existing place with new average rating and incrementing review count
          existing.rating = (existing.rating * existing.reviewCount + review.rating) / (existing.reviewCount + 1);
          existing.reviewCount += 1;
        } else {
          // Adding a new place to the list
          acc.push({
            placeId: review.placeId,
            name: review.placeName, // Ensure you capture name here
            rating: review.rating,
            reviewCount: 1
          });
        }
        return acc;
      }, []);
      setTopRatedPlaces(newTopRatedPlaces);
    };
  
    updateTopRatedPlaces();
  }, [reviews]);
  

  const value = {
    userName,
    setUserName,
    reviews,
    addReview,
    topRatedPlaces
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
