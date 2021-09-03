import {connect} from "react-redux";
import React from 'react';
import {
    deleteFriend,
    getAdditionalUsers,
    getUsers, postAddFriend,
    setCurrentPage,
    setTotalCount,
    setUsers,
    setUsersCount, toggleAddingFriend,
    toggleFriend,
    toggleIsFetching, toggleWhichFriendIsAdding
} from "../reducers/findFriends";
import FindFriends from "../components/FindFriends/FindFriends";
import {withRouter} from "react-router-dom";
import {withAuthRedirect} from "../hoc/withAuthRedirect";
import {compose} from "redux";



class FindFriendsContainer extends React.Component{
    componentDidMount() {
        let urlPageNum = +this.props.match.params.page;
        if(!urlPageNum) urlPageNum = 1;
        this.props.getUsers(this.props.usersCount, urlPageNum)
    }
    render(){
        return(
            <FindFriends {...this.props}/>
        )
    }
}

const mapStateToProps = (state) => {
    return{
        users: state.findFriends.users,
        usersCount: state.findFriends.usersCount,
        currentPage: state.findFriends.currentPage,
        totalCount: state.findFriends.totalCount,
        isFetching: state.findFriends.isFetching,
        isAddingFriend: state.findFriends.isAddingFriend,
        whichFriendIsAdding: state.findFriends.whichFriendIsAdding
    }
}

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
    connect(mapStateToProps,
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
            deleteFriend
        }),
    withRouter,
    withAuthRedirect
)(FindFriendsContainer);