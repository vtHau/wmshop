import React, {useEffect} from 'react';
import {TouchableOpacity} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const Star = props => {
  const {filled, size} = props;
  return (
    <FontAwesome
      name={filled ? 'star' : 'star-o'}
      size={size}
      style={{marginHorizontal: 2}}
      color={'#f39c11'}
    />
  );
};

const Rating = props => {
  const {numStars, rating, setRating, size} = props;

  let stars = [];
  for (let x = 1; x <= numStars; x++) {
    stars.push(
      <TouchableOpacity key={x} onPress={() => setRating(x)}>
        <Star size={size} filled={x <= rating ? true : false} />
      </TouchableOpacity>,
    );
  }
  return <>{stars}</>;
};

export default Rating;
