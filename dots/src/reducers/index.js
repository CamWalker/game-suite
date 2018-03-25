import { combineReducers } from 'redux';
import { START_GAME, PLACE_H_LINE, PLACE_V_LINE } from '../actions';

const INITIAL_STATE = {
  board: [],
  horizontalLines: [],
  verticalLines: [],
  boardWidth: 7,
  boardHeight: 7,
  playerTurn: 1,
};

function isBoxComplete(x, y, horizontalLines, verticalLines) {
  return (
    horizontalLines[y][x] 
    && horizontalLines[y + 1][x]
    && verticalLines[y][x]
    && verticalLines[y][x + 1]
  );
}

function boardReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case START_GAME:
      return {
        ...state,
        horizontalLines: action.payload.horizontalLines,
        verticalLines: action.payload.verticalLines,
        board: action.payload.board,
      };
    case PLACE_H_LINE:
      var { x, y } = action.payload;
      var horizontalLines = [...state.horizontalLines];
      horizontalLines[y][x] = state.playerTurn;
      var board = [...state.board];
      var boardChanged = false;
      if (y > 0 && isBoxComplete(x, y - 1, horizontalLines, state.verticalLines)) {
        board[y - 1][x] = state.playerTurn;
        boardChanged = true;
      }
      if (y < (horizontalLines.length - 1) && isBoxComplete(x, y, horizontalLines, state.verticalLines)) {
        board[y][x] = state.playerTurn;
        boardChanged = true;
      }

      var playerTurn = state.playerTurn;
      if (!boardChanged) {
        playerTurn = (state.playerTurn === 1) ? 2 : 1;
      }

      return {
        ...state,
        horizontalLines,
        playerTurn,
        board,
      };
    case PLACE_V_LINE:
      var { x, y } = action.payload;
      var verticalLines = [...state.verticalLines];
      verticalLines[y][x] = state.playerTurn;
      var board = [...state.board];
      var boardChanged = false;
      if (x > 0 && isBoxComplete(x - 1, y, state.horizontalLines, verticalLines)) {
        board[y][x - 1] = state.playerTurn;
        boardChanged = true;
      }
      if (x < (verticalLines[0].length - 1) && isBoxComplete(x, y, state.horizontalLines, verticalLines)) {
        board[y][x] = state.playerTurn;
        boardChanged = true;
      }

      var playerTurn = state.playerTurn;
      if (!boardChanged) {
        playerTurn = (state.playerTurn === 1) ? 2 : 1;
      }

      return {
        ...state,
        verticalLines,
        playerTurn,
        board,
      };
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  game: boardReducer,
});

export default rootReducer;
