import { combineReducers } from 'redux';
import { createSelector } from 'reselect';
import pendingUserSlice, {
  getUserPendingPromotionRequest,
  pendingUserEnityAdapter,
  acceptUserPendingPromotionRequest,
  rejectUserPendingPromotionRequest,
} from './pendingUserPromotion';

const selectSelf = (state) => state.admin;

const selectPendingSelector = createSelector(
  selectSelf,
  (state) => state.pendingUserRequest
);
const pendingUserEnitySelectors = pendingUserEnityAdapter.getSelectors(
  selectPendingSelector
);
const pendingUserSelectAll = createSelector(
  pendingUserEnitySelectors.selectAll,
  (state) => state
);
const pendingUserLoading = createSelector(
  selectPendingSelector,
  (state) => state.loading
);
const pendingUserError = createSelector(
  selectPendingSelector,
  (state) => state.error
);

export const adminSelectors = {
  pendingUserSelectAll,
  pendingUserLoading,
  pendingUserError,
};

export const adminActions = {
  getUserPendingPromotionRequest,
  acceptUserPendingPromotionRequest,
  rejectUserPendingPromotionRequest,
};

export default combineReducers({
  pendingUserRequest: pendingUserSlice,
});
