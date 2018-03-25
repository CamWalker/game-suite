import _map from 'lodash/map';

export const START_GAME = 'START_GAME';
export const PLACE_H_LINE = 'PLACE_H_LINE';
export const PLACE_V_LINE = 'PLACE_V_LINE';

export function startGame(boardWidth, boardHeight) {
  const hLineRow = _map(Array(boardWidth), () => null);
  const vLineRow = _map(Array(boardWidth + 1), () => null);
  const horizontalLines = _map(Array(boardHeight + 1), () => [...hLineRow]);
  const verticalLines = _map(Array(boardHeight), () => [...vLineRow]);
  const board = _map(Array(boardHeight), () => [...hLineRow]);
  return {
    type: START_GAME,
    payload: {
      horizontalLines,
      verticalLines,
      board,
    },
  };
}

export function placeHLine(x, y) {
  return {
    type: PLACE_H_LINE,
    payload: { x, y },
  };
}

export function placeVLine(x, y) {
  return {
    type: PLACE_V_LINE,
    payload: { x, y },
  };
}