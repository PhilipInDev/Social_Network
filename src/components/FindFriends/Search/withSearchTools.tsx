 import {useHistory} from "react-router-dom";
// import {connect, ConnectedProps, useDispatch, useSelector} from "react-redux";
// import {RootState} from "../../../redux/reduxStore";
// import {ComponentType, FC, useEffect} from "react";
// import {getUsers, setSearchConditions} from "../../../reducers/findFriends";
// import {AnyAction} from "redux";
// import {ThunkDispatch} from "redux-thunk";
//
//
// type ConnectedComponentProps = {
//     setQueryParams: Function
//     setSearchConditions: Function
// }
// type getUserState = {
//     usersCount: number
//     currentPage: number
//     term: string
//     isOnlyFriends: boolean | null
// }
// type AppDispatch = ThunkDispatch<getUserState, unknown, AnyAction>;
// const withSearchTools = (Component: ComponentType<ConnectedComponentProps>) => {
//
//     const ComponentWithSearchTools: FC<SearchToolsProps> = (props) => {
//         let dispatch = useDispatch<AppDispatch>();
//         const {isOnlyFriends, term, currentPage, usersCount} = useSelector((state: RootState) => ({
//             isOnlyFriends: state.findFriends.searchConditions.isOnlyFriends,
//             term: state.findFriends.searchConditions.term,
//             currentPage: state.findFriends.currentPage,
//             usersCount: state.findFriends.usersCount
//         }))
//         // const {isOnlyFriends, term, currentPage, usersCount, getUsers } = props;
//         useEffect(() => dispatch(getUsers(usersCount, currentPage, term, isOnlyFriends)), [term, isOnlyFriends])
//         const history = useHistory();
//         const {location} = history;
//         const setQueryParams = (paramType: 'term' | 'friends', value: boolean | string | null) => {
//             const REG_EX = paramType === 'term' ? /^term=\w$/ : /friends=(true|false|null)/;
//             if(location.search.startsWith('?') && !location.search.includes(paramType)){
//                 history.push(`${location.pathname}${location.search}&${paramType}=${value}`)
//             }
//             if(location.search.startsWith('?') && location.search.includes(paramType)){
//                 const updParams = location.search.replace(REG_EX, `${paramType}=${value}`);
//                 history.push(updParams);
//             }
//         }
//         return <Component setQueryParams={setQueryParams} setSearchConditions={props.setSearchConditions}/>
//     }
//
//     return
// }
// const connector = connect((state: RootState) => ({
//     usersCount: state.findFriends.usersCount,
//     currentPage: state.findFriends.currentPage,
//     isOnlyFriends: state.findFriends.searchConditions.isOnlyFriends,
//     term: state.findFriends.searchConditions.term
// }), {getUsers, setSearchConditions})(ComponentWithSearchTools);
//
// type PropsFromRedux = ConnectedProps<typeof connector>;
//
// interface SearchToolsProps extends PropsFromRedux {
//     currentPage: number
//     isOnlyFriends: boolean | null
//     term: string
//     usersCount: number
//     getUsers: Function
//     setSearchConditions: Function
// }
// export default withSearchTools;