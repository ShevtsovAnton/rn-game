import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';
import RandomNumber from './RandomNumber';
import shuffle from 'lodash.shuffle';

export default function Game({ randomNumberCount, initialSeconds, resetGame }) {
  const [selectedIds, setSelectedIds] = useState([]);
  const [randomNumbers, setRandomNumbers] = useState([]);
  const [shuffledNumbers, setShuffledNumbers] = useState([]);
  const [target, setTarget] = useState(0);
  const [remainingSeconds, setRemainingSeconds] = useState(initialSeconds);
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    const randomNumbers = Array.from({ length: randomNumberCount }).map(
      () => 1 + Math.floor(10 * Math.random())
    );
    setRandomNumbers([...randomNumbers]);
    setShuffledNumbers(shuffle(randomNumbers));
  }, []);

  useEffect(() => {
    setTarget(
      randomNumbers
        .slice(0, randomNumberCount - 2)
        .reduce((acc, curr) => acc + curr, 0)
    );
  }, [randomNumbers]);

  useEffect(() => {
    const int = setInterval(() => {
      setRemainingSeconds((prev) => {
        const next = prev - 1;
        if (next === 0) {
          clearInterval(timer);
        }
        return next;
      });
    }, 1000);
    setTimer(int);
    return () => {
      clearInterval(timer);
    };
  }, []);

  const isNumberSelected = (numberIndex) => {
    return selectedIds.indexOf(numberIndex) >= 0;
  };

  const selectNumber = (numberIndex) => {
    setSelectedIds((prev) => [...prev, numberIndex]);
  };

  const gameStatus = () => {
    const sumSelected = selectedIds.reduce((acc, curr) => {
      return acc + shuffledNumbers[curr];
    }, 0);
    if (remainingSeconds === 0 || sumSelected > target) {
      clearInterval(timer);
      return 'LOST';
    }
    if (sumSelected < target) {
      return 'PLAYING';
    }
    if (sumSelected === target) {
      clearInterval(timer);
      return 'WON';
    }
  };
  let status = 'PLAYING';

  const prevSelectedIdsRef = useRef();
  useEffect(() => {
    prevSelectedIdsRef.current = [...selectedIds];
  });
  const prevSelectedIds = prevSelectedIdsRef.current;

  if (
    (typeof prevSelectedIds !== 'undefined' &&
      prevSelectedIds.length !== selectedIds.length) ||
    remainingSeconds === 0
  ) {
    status = gameStatus();
  }
  return (
    <View style={styles.container}>
      <Text style={[styles.target, styles[`STATUS_${status}`]]}>{target}</Text>
      <View style={styles.randomContainer}>
        {shuffledNumbers.map((randomNumber, i) => (
          <RandomNumber
            key={i}
            id={i}
            number={randomNumber}
            isDisabled={isNumberSelected(i) || status !== 'PLAYING'}
            onPress={selectNumber}
          />
        ))}
      </View>
      <Button onPress={resetGame} title='Play Again'></Button>
      <Text>{remainingSeconds}</Text>
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
