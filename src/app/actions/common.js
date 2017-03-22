export const FINISH_LOADING = 'FINISH_LOADING';
export const START_LOADING = 'START_LOADING';

export function startLoading () {
  return {
    type: START_LOADING,
    payload: true
  };
}

export function finishLoading () {
  return {
    type: FINISH_LOADING,
    payload: false
  };
}