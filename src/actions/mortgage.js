import { FETCH_MORTGAGES } from './actionTypes';

export const getMortgages = (mortgages) => {
  return {
    type: FETCH_MORTGAGES,
    mortgages,
  };
};
