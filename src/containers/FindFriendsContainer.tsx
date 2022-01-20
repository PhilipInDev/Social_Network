import {connect,  ConnectedProps} from "react-redux";
import React, {FC, useEffect} from 'react';
import {
    deleteFriend,
    getAdditionalUsers,
    getUsers, postAddFriend,
    setCurrentPage, setSearchConditions,
    setTotalCount,
    setUsers,
    setUsersCount, toggleAddingFriend,
    toggleFriend,
    toggleIsFetching, toggleWhichFriendIsAdding
} from "../reducers/findFriends";
import FindFriends from "../components/FindFriends/FindFriends";
import {useLocation} from "react-router-dom";
import {withAuthRedirect} from "../hoc/withAuthRedirect";
import {compose} from "redux";
import {withGlobalMessage} from "../hoc/withGlobalMessage";
import {RootState} from "../redux/reduxStore";
import qs from 'qs';

const FindFriendsContainer: FC<FindFriendsPropsType> = (props) => {
    let location: any = useLocation();
    const paramsParsed = qs.parse(location.search, { ignoreQueryPrefix: true });
    const {term, isOnlyFriends} = props.searchConditions;
    useEffect(() => {
        window.scrollTo( 0, 0 );
        if(location.search){
            const urlPageNum = paramsParsed.page ? paramsParsed.page : 1;
            const friends = paramsParsed.friends ? paramsParsed.friends as string : isOnlyFriends;
            const finalTerm = paramsParsed.term ? paramsParsed.term as string : term;
            props.getUsers(props.usersCount, +urlPageNum, finalTerm, friends);
        }
        if(!location.search) props.getUsers(props.usersCount, 1, '', null)
        //     .then(() => countGoodUsers());
        // const countGoodUsers = async () => {
        //     const pagesCount = Math.ceil(this.props.totalCount / 100);
        //     let usersArray = [];
        //     let i = 1;
        //         setInterval(() => {
        //             if(i === pagesCount) return;
        //             UsersAPI.getUsers(100, i)
        //                 .then((data) => {
        //                     for(let j = 0; j < data.items.length; j++){
        //                         if(data.items[j].photos.small){
        //                             usersArray.push(data.items[j])
        //                         }
        //                     }
        //                     i++;
        //                     console.log(`Good users count: ${usersArray.length}.
        //                                 Total users count: ${this.props.totalCount}.
        //                                 Ratio: ${usersArray.length / this.props.totalCount}`)
        //                 })
        //         }, 1000)
        // }
    },[location.search])
    return(
        <FindFriends {...props}/>
    )
}

const mapStateToProps = (state: RootState) => {
    return{
        users: state.findFriends.users,
        usersCount: state.findFriends.usersCount,
        currentPage: state.findFriends.currentPage,
        totalCount: state.findFriends.totalCount,
        isFetching: state.findFriends.isFetching,
        isAddingFriend: state.findFriends.isAddingFriend,
        whichFriendIsAdding: state.findFriends.whichFriendIsAdding,
        searchConditions: state.findFriends.searchConditions
    }
}
const connector = connect(
    mapStateToProps,
    {
        toggleFriend,
        setUsers,
        setUsersCount,
        setTotalCount,
        setCurrentPage,
        toggleIsFetching,
        toggleAddingFriend,
        toggleWhichFriendIsAdding,
        getUsers,
        getAdditionalUsers,
        postAddFriend,
        deleteFriend,
        setSearchConditions
    }
);
export type FindFriendsPropsType = ConnectedProps<typeof connector>
/*
const mapDispatchToProps = (dispatch) => {
    return{
        toggleFriend: (id, isFriend) => {
            dispatch(toggleFriendActionCreator(id, isFriend))
        },
        setUsers: (users) => {
            dispatch(setUsersActionCreator(users))
        },
        setUsersCount: (usersCount) => {
            dispatch(setUsersCountActionCreator(usersCount))
        },
        setTotalCount: (totalCount) => {
            dispatch(setTotalCountActionCreator(totalCount))
        },
        setCurrPage: (currPage) => {
            dispatch(setCurrentPageActionCreator(currPage))
        },
        toggleIsFetching: (isFetching) => {
            dispatch(toggleIsFetchingActionCreator(isFetching))
        }
    }
}
*/


//
// let authRedirectComponent = withAuthRedirect(FindFriendContainer);
//
// const findFriendsWithRouter = withRouter(authRedirectComponent);
//
// const FindFriendsContainer = connect(mapStateToProps,
//     {
//         toggleFriend,
//         setUsers,
//         setUsersCount,
//         setTotalCount,
//         setCurrentPage,
//         toggleIsFetching,
//         toggleAddingFriend,
//         toggleWhichFriendIsAdding,
//         getUsers,
//         getAdditionalUsers,
//         postAddFriend,
//         deleteFriend
//     })(findFriendsWithRouter)

export default compose(
    connector,
    withAuthRedirect,
    withGlobalMessage)(FindFriendsContainer);