import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
// import { StackNavigator } from 'react-navigation';
import Board from './src/containers/Board';
import reducers from './src/reducers/index';

const store = createStore(reducers);

// const RootStack = StackNavigator({
//   Board: {
//     screen: Board,
//   },
//   // Settings: {
//   //   screen: Settings,
//   // }
// }, {
//   initialRouteName: 'Board',
// });

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <View style={styles.container}>
          <Board />
        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
