import React from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableWithoutFeedback } from 'react-native';
import { connect } from 'react-redux';
import Line from './Line';
import Square from './Square';
import { startGame, placeHLine, placeVLine } from '../actions';
import _map from 'lodash/map';
import _get from 'lodash/get';


const boardWidthPx = Dimensions.get('window').width - 60;

class Board extends React.Component {
  constructor(props) {
    super(props)
    props.startGame(props.boardWidth, props.boardHeight);
  }

  pressLine = (horizontal, x, y) => {
    if (horizontal) {
      if (!this.props.horizontalLines[y][x]) {
        this.props.placeHLine(x, y);
      }
    } else {
      if (!this.props.verticalLines[y][x]) {
        this.props.placeVLine(x, y);
      }
    }
  }

  render() {
    const {
      board,
      horizontalLines,
      verticalLines,
      boardWidth,
      boardHeight,
    } = this.props;

    const fullBoard = [];
    for (var y = 0; y < (verticalLines.length * 2 + 1); y++) {
      const row = [];
      if (y % 2 === 0) {
        for (var x = 0; x < (verticalLines.length * 2 + 1); x++) {
          if (x % 2 === 0) {
            row.push(<View key={x} style={styles.dot} />)
          } else {
            const hx = (x - 1) / 2;
            const hy = y / 2;
            row.push(
              <Line
                key={x}
                x={hx}
                y={hy}
                onPress={this.pressLine}
                horizontal
                player={horizontalLines[hy][hx]}
              />
            );
          }
        }
        fullBoard.push(
          <View
            key={y}
            style={styles.dotRow}
          >
            {row}
          </View>
        );
      } else {
        for (var x = 0; x < (verticalLines.length * 2 + 1); x++) {
          if (x % 2 === 0) {
            const vx = x / 2;
            const vy = (y - 1) / 2;
            row.push(
              <Line
                key={x}
                x={vx}
                y={vy}
                onPress={this.pressLine}
                player={verticalLines[vy][vx]}
              />
            );
          } else {
            const vx = (x - 1) / 2;
            const vy = (y - 1) / 2;
            row.push(
              <Square
                key={x}
                value={_get(board, [vy, vx], null)}
              />
            );
          }
        }
        fullBoard.push(
          <View
            key={y}
            style={styles.squareRow}
          >
            {row}
          </View>
        );
      }
    }

    return(
      <View style={styles.container}>
        <View style={styles.boardContainer}>
          {fullBoard}
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: '#F4F4F4',
    justifyContent: 'center',
    alignItems: 'center',
  },
  boardContainer: {
    width: boardWidthPx,
    height: boardWidthPx,
    justifyContent: 'space-between',
  },
  dotRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 10,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#555',
  },
  squareRow: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

function mapStateToProps(store) {
  return {
    horizontalLines: store.game.horizontalLines,
    verticalLines: store.game.verticalLines,
    board: store.game.board,
    boardWidth: store.game.boardWidth,
    boardHeight: store.game.boardHeight,
    playerTurn: store.game.playerTurn,
  };
}

export default connect(mapStateToProps, { startGame, placeHLine, placeVLine })(Board);
