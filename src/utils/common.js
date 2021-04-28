import React from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';

export const renderRating = rating => {
  var result = [];
  for (var i = 1; i <= rating; i++) {
    result.push(
      <AntDesign key={i} name={'star'} size={14} color={'#f39c11'} />,
    );
  }
  for (var j = 1; j <= 5 - rating; j++) {
    result.push(
      <AntDesign key={100 + j} name={'star'} size={14} color={'grey'} />,
    );
  }
  return result;
};
