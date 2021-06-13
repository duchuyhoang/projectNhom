import React, { Component } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Pagination from '@material-ui/lab/Pagination';
import PaginationItem from '@material-ui/lab/PaginationItem'
const usePaginationStyles = makeStyles((theme) => {
    return {
        root: {
        },
        ul: {
            "&  li:first-child": {
                "& button": {
                    "& svg": {
                        "& path": {
                            d: "path('M 20 11 H 7.83 l 5.59 -5.59 L 12 4 l -8 8 l 8 8 l 1.41 -1.41 L 7.83 13 H 20 v -2 Z')"
                        }
                    }
                }
            },
            "&  li:last-child": {
                "& button": {
                    "& svg": {
                        "& path": {
                            d: "path('M 12 4 l -1.41 1.41 L 16.17 11 H 4 v 2 h 12.17 l -5.58 5.59 L 12 20 l 8 -8 Z')"
                        }
                    }
                }
            }
        }
    }
});
const usePaginationItemStyles = makeStyles((theme) => {
    return {
        root: {
            padding: 10,
            height: 40,
            width: 40,
            borderRadius: "100%",
            border: `1px solid ${theme.border.main}`,
            "&:hover": {
                backgroundColor: theme.palette.primary.main,
                color: theme.palette.text.secondary,
                transition: "background-color .3s linear, color .3s .2s"
            },
        },
        selected: {
            backgroundColor: `${theme.palette.primary.main} !important `,
            color: theme.palette.text.secondary,
            transform: "scale(1.1)"
        },
        ellipsis: {
            border: "none",
            fontSize: 14,
            color: theme.palette.primary.main,
            "&:hover": {
                backgroundColor: "transparent",
                color: theme.palette.primary.main
            }

        }
    }
})
export const CNPagination = ({ page,setPaginationIndex, total, ...rest }) => {
    const paginationStyles = usePaginationStyles();
    const paginationItemStyles = usePaginationItemStyles();


    const paginationHandler = (e, page) => {
        setPaginationIndex(page);
    }
    return (
        <>
            <Pagination
                classes={paginationStyles}
                page={page}
                count={total}
                siblingCount={1}
                hideNextButton={page === total}
                hidePrevButton={page === 1}
                onChange={paginationHandler}
                renderItem={(item) => <PaginationItem classes={paginationItemStyles} {...item} />}

                {...rest}
            />


        </>

    )
}




