import React, {useState} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const numStars = 5;

const Star = props => {
  const {filled} = props;
  return (
    <FontAwesome
      name={filled ? 'star' : 'star-o'}
      size={28}
      style={{marginHorizontal: 6}}
      color={'#003FFF'}
    />
  );
};

const Rating = () => {
  const [rating, setRating] = useState(4);

  let stars = [];
  for (let x = 1; x <= numStars; x++) {
    stars.push(
      <TouchableOpacity key={x} onPress={() => setRating(x)}>
        <Star filled={x <= rating ? true : false} />
      </TouchableOpacity>,
    );
  }
  return (
    <View style={styles.container}>
      <View style={{flexDirection: 'row'}}>{stars}</View>
      <TouchableOpacity
        onPress={() => {
          console.log(rating);
        }}>
        <Text>ok</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Rating;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
