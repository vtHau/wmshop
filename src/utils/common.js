import React from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
// import AntDesign from 'react-native-vector-icons/AntDesign';

export const renderRating = rating => {
  var result = [];
  for (var i = 1; i <= rating; i++) {
    result.push(
      <FontAwesome
        style={{paddingHorizontal: 1}}
        key={i}
        name={'star'}
        size={14}
        color={'#f39c11'}
      />,
    );
  }
  for (var j = 1; j <= 5 - rating; j++) {
    result.push(
      <FontAwesome
        key={100 + j}
        style={{paddingHorizontal: 1}}
        name={'star-o'}
        size={14}
        color={'#f39c11'}
      />,
    );
  }
  return result;
};
