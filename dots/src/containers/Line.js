import React from 'react';
import { View, TouchableHighlight, StyleSheet } from 'react-native';

const Line = ({ horizontal, x, y, onPress, player, lineLength }) => {
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
    <TouchableHighlight
      key={x}
      onPress={() => onPress(horizontal, x, y)}
      style={horizontal ? { width: lineLength, height: 12, borderRadius: 6 } : { width: 12, height: lineLength, borderRadius: 6 }}
      underlayColor="#555"
    >
      <View style={horizontal ? [styles.hLineButton, lightColor] : [styles.vLineButton, lightColor]}>
        <View style={horizontal ? [styles.hLine, lineColor] : [styles.vLine, lineColor]} />
      </View>
    </TouchableHighlight>
  );
}

const styles = StyleSheet.create({
  hLine: {
    width: '100%',
    height: 6,
  },
  hLineButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 6,
  },
  vLineButton: {
    width: 12,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 6,
  },
  vLine: {
    width: 6,
    height: '100%',
  },
});

export default Line;