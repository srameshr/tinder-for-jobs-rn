import _ from 'lodash';
import {
  LIKE_JOB,
  CLEAR_LIKED_JOBS,
} from '../actions/types';

const INITIAL_STATE = [];

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CLEAR_LIKED_JOBS:
      return [];
    case LIKE_JOB:
      return _.uniqBy([
        action.payload,
        ...state,
      ], 'jobKey');
    default:
      return state;
  }
};
