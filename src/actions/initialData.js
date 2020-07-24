import { showLoading, hideLoading } from './loading';
import { getMortgages } from '../actions/mortgage';
import { fetchMortgages } from '../services/mortgage';

export const handleInitialData = () => {
  return async (dispatch) => {
    dispatch(showLoading());
    return getInitialData()
      .then(({ mortgages }) => {
        dispatch(getMortgages(mortgages));
        dispatch(hideLoading());
      })
      .catch(() => dispatch(hideLoading()));
  };
};

const getInitialData = async () => {
  const [mortgages] = await Promise.all([fetchMortgages()]);

  return {
    mortgages,
  };
};
