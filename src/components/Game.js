import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import RandomNumber from './RandomNumber';

export default function Game({ randomNumberCount }) {
  const [selectedIds, setSelectedIds] = useState([]);
  const [randomNumbers, setRandomNumbers] = useState([]);
  const [target, setTarget] = useState(0);

  useEffect(() => {
    setRandomNumbers(
      Array.from({ length: randomNumberCount }).map(
        () => 1 + Math.floor(10 * Math.random())
      )
    );
  }, []);

  useEffect(() => {
    setTarget(
      randomNumbers
        .slice(0, randomNumberCount - 2)
        .reduce((acc, curr) => acc + curr, 0)
    );
  }, [randomNumbers]);

  const isNumberSelected = (numberIndex) => {
    return selectedIds.indexOf(numberIndex) >= 0;
  };

  const selectNumber = (numberIndex) => {
    setSelectedIds((prev) => [...prev, numberIndex]);
  };

  const gameStatus = () => {
    const sumSelected = selectedIds.reduce((acc, curr) => {
      return acc + randomNumbers[curr];
    }, 0);
    if (sumSelected < target) {
      return 'PLAYING';
    }
    if (sumSelected === target) {
      return 'WON';
    }
    if (sumSelected > target) {
      return 'LOST';
    }
  };
  const status = gameStatus();

  return (
    <View style={styles.container}>
      <Text style={[styles.target, styles[`STATUS_${status}`]]}>{target}</Text>
      <View style={styles.randomContainer}>
        {randomNumbers.map((randomNumber, i) => (
          <RandomNumber
            key={i}
            id={i}
            number={randomNumber}
            isDisabled={isNumberSelected(i) || status !== 'PLAYING'}
            onPress={selectNumber}
          />
        ))}
      </View>
      <Text>{status}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ddd',
  },
  target: {
    fontSize: 50,
    backgroundColor: '#bbb',
    margin: 50,
    textAlign: 'center',
  },
  randomContainer: {
    flex: 1,
    height: 300,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  STATUS_PLAYING: {
    backgroundColor: '#bbb',
  },
  STATUS_WON: {
    backgroundColor: 'green',
  },
  STATUS_LOST: {
    backgroundColor: 'red',
  },
});
