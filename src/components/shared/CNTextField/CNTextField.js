import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';

const useTextFiledContentStyles = makeStyles((theme) => {
    return {
        root: {
            border: `2px solid #d8d8d8`,
            width: 300,
            borderRadius: 5

        },
        input: {
            paddingLeft: 10,
            paddingTop: 10,
            paddingBottom: 10,
            fontSize: 18,
            fontWeight: 500

        }
    }
})

export const CNTextField = ({ inputChange }) => {

    const textFieledStyles = useTextFiledContentStyles();
    return (
        <>
            <Input
                placeholder="Input keywords..."
                disableUnderline={true}
                classes={textFieledStyles}
                onChange={inputChange}
                inputProps={{
                    'aria-label': 'Description',
                }}
            />
        </>
    )
}
