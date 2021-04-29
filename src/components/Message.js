import React, { useState } from "react";
import { SVGIcon } from "@Components/shared/SvgIcon/Icon";
import { makeStyles } from '@material-ui/core/styles';
import { CNSnackBar } from "./shared/CNSnackBar/CNSnackBar";
import FixedContainer from "@Components/shared/Layout/FixedContainer"
import { CNNotifications } from "@Components/shared/CNNotifications/CNNotifications";
import { CNSelect } from "@Components/shared/CNSelect/CNSelect";
import { CNTextField } from "@Components/shared/CNTextField/CNTextField";


const useStyles = makeStyles(theme => {
    return {
        root: (props) => {
            return {
                ...theme.typography.header
            }
        }
    }
    }      
})


const Message = ({ message }) => {
    const styles = useStyles();
    //const [selectValue,setSelecteValue]=useState(null);
    const [inputValue, setInputValue] = useState(null);
    console.log(inputValue);
    const inputChange = (e) => {
        setInputValue(e.target.value)

    };


    return (
        <>

            <CNTextField
                inputChange={inputChange}
            />


        </>
    )

}

export default Message
