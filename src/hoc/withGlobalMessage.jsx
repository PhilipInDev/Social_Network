import {connect} from "react-redux";
import {useEffect} from "react";
import {removeGlobalMessage} from "../reducers/app";

export const withGlobalMessage = (Component) => {
    const RedirectComponent = (props) => {
        useEffect(() => {
            return () => {
                props.removeGlobalMessage();
            }
        },[props.removeGlobalMessage])
        return <Component {...props}/>
    }

    return connect(null, { removeGlobalMessage })(RedirectComponent);
}