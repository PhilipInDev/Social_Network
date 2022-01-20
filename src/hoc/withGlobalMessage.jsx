import {connect} from "react-redux";
import {useEffect} from "react";
import {removeGlobalMessage} from "../reducers/app";

export const withGlobalMessage = (Component) => {
    const ComponentWithGlobalMessage = (props) => {
        useEffect(() => {
            return () => {
                if(props.globalMessage.length) props.removeGlobalMessage();
            }
        },[props.removeGlobalMessage])
        return <Component {...props}/>
    }

    return connect((state) => ({globalMessage: state.app.globalMessage}), { removeGlobalMessage })(ComponentWithGlobalMessage);
}