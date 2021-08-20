import {connect} from "react-redux";
import React from 'react';
import {
    setCurrentPage,
    setTotalCount,
    setUsers,
    setUsersCount, toggleAddingFriend,
    toggleFriend,
    toggleIsFetching, toggleWhichFriendIsAdding
} from "../reducers/findFriends";
import FindFriends from "../components/FindFriends/FindFriends";
import {withRouter} from "react-router-dom";
import {getUsers} from "../api/api";



class FindFriendContainer extends React.Component{

    componentDidMount() {
        let urlPageNum = +this.props.match.params.page;
        if(!urlPageNum) urlPageNum = 1;

        this.props.setCurrentPage(urlPageNum);
        this.props.toggleIsFetching(true);
        getUsers(this.props.usersCount, urlPageNum)
            .then((data) => {
                this.props.toggleIsFetching(false);
                this.props.setUsers(data.items);
                this.props.setTotalCount(data.totalCount);
            });
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
const findFriendsWithRouter = withRouter(FindFriendContainer)

const FindFriendsContainer = connect(mapStateToProps,
    {
        toggleFriend,
        setUsers,
        setUsersCount,
        setTotalCount,
        setCurrentPage,
        toggleIsFetching,
        toggleAddingFriend,
        toggleWhichFriendIsAdding
    })(findFriendsWithRouter)

export default FindFriendsContainer;