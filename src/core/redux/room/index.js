import { combineReducers } from "redux";
import { createSelector } from "reselect";
import { createAction } from '@reduxjs/toolkit'
import homeRoomReducer, { homeRoomAdapter, getLatestHomeRoom } from "./homeRoom";
import searchRoomReducer, { searchRoomAdapter, getRoomsSearched } from "./searchRoom";

const selectSelf = (state) => state.room



// Home room
const selectHomeRoom = createSelector(selectSelf, (state) => state.homeRoom)
const homeRoomSelectors = homeRoomAdapter.getSelectors(selectHomeRoom);
const homeRoomSelectAll = createSelector(homeRoomSelectors.selectAll, (state) => state)

// search room

const selectSearchRoom = createSelector(selectSelf, (state) => state.searchRoom)
// 

const searchRoomSelectors = searchRoomAdapter.getSelectors(selectSearchRoom)
const searchRoomSelectorAll = createSelector(searchRoomSelectors.selectAll, (state) => state)
const searchRoomLoadingStatus = createSelector(selectSearchRoom, (state) => state.loading);
const searchRoomError = createSelector(selectSearchRoom, (state) => state.error);
const searchRoomSelectById = (id) => {
    return createSelector((state) => {
        return searchRoomSelectors.selectById(state, id)
    }, (state) => state)
}

const increment=createAction("increment")




export const roomSelectors = {
    // homeRoom
    homeRoomSelectAll,
    // searchRoom
    searchRoomSelectorAll,
    searchRoomSelectById,
    searchRoomLoadingStatus,
    searchRoomError,
    
}

export const roomActions = {
    getLatestHomeRoom,
    // getById:,
    getRoomsSearched,
    increment
}


export default combineReducers({
    homeRoom: homeRoomReducer,
    searchRoom: searchRoomReducer
})