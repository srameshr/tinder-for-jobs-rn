import {
  FACEBOOK_LOGIN_SUCCESS,
  FACEBOOK_LOGIN_FAILURE,
} from '../actions/types';

export default (state = {}, action) => {
  switch (action.type) {
    case FACEBOOK_LOGIN_SUCCESS:
      return { token: action.payload };
    case FACEBOOK_LOGIN_FAILURE:
      return { token: null };
    default:
      return state;
  }
};
