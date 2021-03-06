import React from "react";
import { CNSnackBar } from "@Components/shared/CNSnackBar/CNSnackBar";
import FixedContainer from "@Components/shared/Layout/FixedContainer"
import { CNNotifications } from "@Components/shared/CNNotifications/CNNotifications";
import { SVGIcon } from "@Components/shared/SvgIcon/Icon";
import "./ErrorBoundary.css";


export class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, isOpen: false, errorDescribe: null };
    }

    static getDerivedStateFromError(error) {
        // Update state so the next render will show the fallback UI.
        console.log(error.message);
        return { hasError: true, isOpen: true, errorDescribe: error.message };
    }

    componentDidCatch(error, errorInfo) {
        // You can also log the error to an error reporting service

    }

    handleClose() {
        this.setState({
            ...this.state,
            isOpen: false
        })
    }

    handleOpen(e) {
        this.setState({
            ...this.state,
            isOpen: true
        })
    }

    render() {
        if (this.state.hasError) {
            return (
                <>
                {!this.state.isOpen && <FixedContainer config={{
                    alignItems: "center",
                    justifyContent: "center",
                }
                }>

                    <CNNotifications>
                        <SVGIcon name="close" width="20" height="20" className="closeIcon" onClick={this.handleOpen.bind(this)}/>
                        {this.state.errorDescribe}
                    </CNNotifications>

                    

                </FixedContainer>}
                

                <CNSnackBar severity={"error"} isErrorBoundaryAlert={true} isOpen={this.state.isOpen} onClose={this.handleClose.bind(this)}
                        handleClick={
                            ()=>{
                               
                                this.handleClose()
                            }
                           }>
                        Error !!!
                     </CNSnackBar>
</>
            )
        }

        return this.props.children;
    }
}