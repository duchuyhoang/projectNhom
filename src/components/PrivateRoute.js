import React, { useEffect } from "react";
import { useAuth } from "@Core/hooks/useAuth";
import { userPermission } from "@Core/const";
import { CNLoading } from '@Components/shared/CNLoading/CNLoading';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
    useHistory
} from 'react-router-dom';

export const PrivateRoute = ({ accessRule = "GUEST", children,...rest }) => {
    const { permission, authLoading,isLogin } = useAuth(true);
    const history = useHistory()
    useEffect(() => {
        const timeout=setTimeout(() => {
            if (authLoading === "idle" || authLoading === "loading")
                history.push("/home");
        }, 1500)

        // Need here to clear timeout prevent just open up and redirect
        return ()=>{
            clearTimeout(timeout);
        }
    }, [authLoading])


    return (
        <>
<Route 
{...rest}
render={({location})=>
    authLoading === "idle" || authLoading === "loading" ?
    <CNLoading /> :
    (userPermission[permission] >= userPermission[accessRule] ? children : (<Redirect to="/home" />))

    }
/>


           
        </>
    )

}