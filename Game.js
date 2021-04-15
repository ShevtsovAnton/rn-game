import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

export default function App() {
  const target = 10 + Math.floor(40 * Math.random());
  return (
    <>
      <View style={styles.container}>
        <Text style={styles.target}>{target}</Text>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ddd',
    paddingTop: 30,
  },
  target: {
    fontSize: 40,
    backgroundColor: '#aaa',
    marginHorizontal: 50,
    textAlign: 'center',
  },
});
