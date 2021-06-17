import { combineReducers } from 'redux';
import { createSelector } from 'reselect';
import { createAction } from '@reduxjs/toolkit';
import homeRoomReducer, {
  homeRoomAdapter,
  getLatestHomeRoom,
} from './homeRoom';
import searchRoomReducer, {
  searchRoomAdapter,
  getRoomsSearched,
  updateSearchRoomCondition
} from './searchRoom';
import currentRoomReducer, { setSelectedRoomByNameRouter } from './currentRoom';
import pendingRoomReducer, {
  clearNotPendingRoom,
  pendingRoomAdapter,
  getPendingRoom,
  acceptPendingRoom,
  rejectPendingRoom,
} from './pendingRoom';

const selectSelf = (state) => state.room;

// Pending room
const selectPendingRoom = createSelector(
  selectSelf,
  (state) => state.pendingRoom
);
const pendingRoomSelector = pendingRoomAdapter.getSelectors(selectPendingRoom);
const pendingRoomSelectAll = createSelector(
  pendingRoomSelector.selectAll,
  (state) => state
);

// Home room
const selectHomeRoom = createSelector(selectSelf, (state) => state.homeRoom);
const homeRoomSelectors = homeRoomAdapter.getSelectors(selectHomeRoom);
const homeRoomSelectAll = createSelector(
  homeRoomSelectors.selectAll,
  (state) => state
);

// search room
const selectSearchRoom = createSelector(
  selectSelf,
  (state) => state.searchRoom
);
//

const searchRoomSelectors = searchRoomAdapter.getSelectors(selectSearchRoom);
const searchRoomSelectorAll = createSelector(
  searchRoomSelectors.selectAll,
  (state) => state
);
const searchRoomLoadingStatus = createSelector(
  selectSearchRoom,
  (state) => state.loading
);
const searchRoomError = createSelector(
  selectSearchRoom,
  (state) => state.error
);
const searchRoomCondition = createSelector(
  selectSearchRoom,
  (state) => state.searchCondition
);
const searchRoomTotalPages = createSelector(
  selectSearchRoom,
  (state) => state.totalPage
);
const searchRoomSelectById = (id) => {
  return createSelector(
    (state) => {
      return searchRoomSelectors.selectById(state, id);
    },
    (state) => state
  );
};

// current selected room
const selectCurrentRoomRoot = createSelector(
  selectSelf,
  (state) => state.currentRoom
);
//
const selectCurrentRoom = createSelector(
  selectCurrentRoomRoot,
  (state) => state.currentRoom
);
const currentRoomLoading = createSelector(
  selectCurrentRoomRoot,
  (state) => state.loading
);
const currentRoomError = createSelector(
  selectCurrentRoomRoot,
  (state) => state.error
);

export const roomSelectors = {
  // homeRoom
  homeRoomSelectAll,

  // searchRoom
  searchRoomSelectorAll,
  searchRoomSelectById,
  searchRoomLoadingStatus,
  searchRoomError,
  searchRoomCondition,
  searchRoomTotalPages,

  // currentRoom
  selectCurrentRoom,
  currentRoomLoading,
  currentRoomError,

  // pendingRoom
  pendingRoomSelectAll
};

export const roomActions = {
  getLatestHomeRoom,
  getRoomsSearched,
  setSelectedRoomByNameRouter,
  updateSearchRoomCondition,

  // pending room
  getPendingRoom,
  acceptPendingRoom,
  rejectPendingRoom,
  clearNotPendingRoom,
};

export default combineReducers({
  homeRoom: homeRoomReducer,
  searchRoom: searchRoomReducer,
  currentRoom: currentRoomReducer,
  pendingRoom: pendingRoomReducer,
});
