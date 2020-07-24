import { combineReducers } from 'redux';
import { reducer as toastrReducer } from 'react-redux-toastr';
import { reducer as formReducer } from 'redux-form';
import error from './error';
import authedUser from './authedUser';
import link from './callBackLink';
import loading from './loading';
import mortgages from './mortgage';

export default combineReducers({
  form: formReducer,
  error,
  toastr: toastrReducer,
  authedUser,
  link,
  loading,
  mortgages,
});
