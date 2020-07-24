import { FETCH_MORTGAGES } from '../actions/actionTypes';

export default function mortgages(state = {}, action) {
  switch (action.type) {
    case FETCH_MORTGAGES:
      return {
        ...state,
        ...action.mortgages,
      };
    default:
      return state;
  }
}
