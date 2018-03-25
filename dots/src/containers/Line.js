import React from 'react';
import { View, TouchableWithoutFeedback, StyleSheet } from 'react-native';

const Line = ({ horizontal, x, y, onPress, player }) => {
  const lineColor = {};
  const lightColor = {};
  if (player === 1) {
    lineColor.backgroundColor = '#D40000';
    lightColor.backgroundColor = '#DA9494';
  } else if (player === 2) {
    lineColor.backgroundColor = '#004FD4';
    lightColor.backgroundColor = '#87A4D3';
  }
  return (
    <TouchableWithoutFeedback
      key={x}
      onPress={() => onPress(horizontal, x, y)}
    >
      <View style={horizontal ? [styles.hLineButton, lightColor] : [styles.vLineButton, lightColor]}>
        <View style={horizontal ? [styles.hLine, lineColor] : [styles.vLine, lineColor]} />
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  hLine: {
    width: '100%',
    height: 5,
  },
  hLineButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  vLineButton: {
    width: 10,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  vLine: {
    width: 5,
    height: '100%',
  },
});

export default Line;