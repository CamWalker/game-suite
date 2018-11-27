import React from 'react';
import { View, Text } from 'react-native';

const Square = ({ value }) => {
  const filled = {};
  if (value === 1) {
    filled.backgroundColor = '#DA9494';
  } else if (value === 2) {
    filled.backgroundColor = '#87A4D3';
  }
  
  return (
    <View style={[{
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 3,
    }, filled]}>
      <Text>{value}</Text>
    </View>
  )
};

export default Square;
