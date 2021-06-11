import {combineReducers} from "redux";
import { createSelector } from "reselect";

import homeRoomReducer,{homeRoomAdapter,getLatestHomeRoom} from "./homeRoom";
import searchRoomReducer,{searchRoomAdapter,getRoomsSearched} from "./searchRoom";

const selectSelf=(state)=> state.room



// Home room
const selectHomeRoom=createSelector(selectSelf,(state)=>state.homeRoom)
const homeRoomSelectors=homeRoomAdapter.getSelectors(selectHomeRoom);




const homeRoomSelectAll=createSelector(homeRoomSelectors.selectAll,(state)=>state)

// search room

const selectSearchRoom = createSelector(selectSelf,(state) => state.searchRoom)
const searchRoomSelectors = searchRoomAdapter.getSelectors(selectSearchRoom)

const searchRoomSelectorAll = createSelector(searchRoomSelectors.selectAll, (state)=>state)


// homeRoomSelectors.selectAll


export const roomSelectors={
    homeRoomSelectAll,
    searchRoomSelectorAll
}

export const roomActions={
    getLatestHomeRoom,
    // getById:,
    getRoomsSearched
}


export default combineReducers({
 homeRoom:homeRoomReducer,
 searchRoom:searchRoomReducer   
})