import { KeyboardReturnOutlined } from "@material-ui/icons";
import React, { useState, useEffect, useRef } from "react";


export const usePagination = (enableFirstTimeRender = true, page_index, item_per_page,
    handlePageIndexChange = () => { },
    handleItemPerPageChange = () => { }) => {

    const enableFirstTimeCallPageIndex = useRef(enableFirstTimeRender);
    const enableFirstTimeCallItemPerPage = useRef(enableFirstTimeRender);
    const [pageIndex, setPageIndex] = useState(() => { return isNaN(page_index) ? 1 : page_index })
    const [itemPerPage, setItemPerPage] = useState(() => { return isNaN(item_per_page) ? 1 : item_per_page });


    useEffect(() => {
        if (!enableFirstTimeCall.current) {

            enableFirstTimeCall.current = false;
            return;
        }
        handlePageIndexChange()

    }, [pageIndex])

    useEffect(() => {
        if (!enableFirstTimeCallPageIndex.current) {

            enableFirstTimeCallPageIndex.current = false;
            return;
        }
        handlePageIndexChange()

    }, [pageIndex])

useEffect(() => {
    if(!enableFirstTimeCallItemPerPage.current){
        enableFirstTimeCallItemPerPage.current=false;
        return;
    }
    handleItemPerPageChange()
})


    return {
        pageIndex,
        setPageIndex,
        itemPerPage,
        setItemPerPage
    }



}


