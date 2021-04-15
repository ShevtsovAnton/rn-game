import React from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function RandomNumber({ number, id, isDisabled, onPress }) {
  const handlePress = () => {
    if (isDisabled) {
      return;
    }
    onPress(id);
  };
  return (
    <TouchableOpacity onPress={handlePress}>
      <Text style={[styles.random, isDisabled && styles.disabled]}>
        {number}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  random: {
    backgroundColor: '#999',
    width: 100,
    marginHorizontal: 15,
    marginVertical: 25,
    fontSize: 35,
    textAlign: 'center',
  },
  disabled: {
    opacity: 0.3,
  },
});
