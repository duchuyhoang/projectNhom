import React, { useState, useEffect } from "react";
import { makeStyles } from '@material-ui/core/styles';
import { Stretcher } from "@Components/components/Stretcher/Stretcher";
import { Footer } from "@Components/components/Footer/Footer";
import { axiosApi } from "@Core/api/axiosApi";
import { useDispatch, useSelector } from "react-redux"
import { authActions } from "@Core/redux/auth";
import { currentUserActions } from "@Core/redux/user";
import { useAuth } from "@Core/hooks/useAuth";



const useStyles = makeStyles((theme) => {
    return {
        style: {
            display: "flex",
            top: "0",
            left: "0",
            right: "0",
            bottom: "0",
            alignItems: "center",
            justifyContent: "center",
            position: "fixed"
        }
    }
}
)


const Message = ({ message }) => {
    const [isHomeModalShow, setIsHomeModalShow] = useState(false);
    const dispatch = useDispatch();
    const result = useSelector(state => state);


    const userInfo = useAuth()
    console.log(userInfo)

    useEffect(async () => {
        dispatch(authActions.reLogin());
    }, [])

    return (
        <>
            <Stretcher>

            </Stretcher>
            <Footer>

            </Footer>
            {isHomeModalShow && <HomeModal showModal={isHomeModalShow} setShowModal={setIsHomeModalShow} />}
            <button onClick={() => {
                dispatch(authActions.userLogin({
                    email: "huyhoang10032000@gmail.com",
                    password: "12345"
                }))

            }}>Login</button>

        </>
    )

}

export default Message

