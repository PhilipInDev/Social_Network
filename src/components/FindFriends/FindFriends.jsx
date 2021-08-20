import './FindFriends.scss'
import UserItem from "./UserItem/UserItem";
import SearchFilters from "./SearchFilters/SearchFilters";
import ShowMoreBtn from "./ShowMoreBtn/ShowMoreBtn";
import axios from "axios";
import React from 'react';
import Pagination from "./Pagination/Pagination";
import {getUsers} from "../../api/api";
import {toggleWhichFriendIsAdding} from "../../reducers/findFriends";

class FindFriends extends React.Component{
    mapUserItems = () => {
       return this.props.users.map(item =>
            <UserItem photos={item.photos}
                      name={item.name}
                // location={item.location}
                      status={item.status}
                      isFriend={item.followed}
                      id={item.id}
                      toggleFriend={this.props.toggleFriend}
                      toggleAddindFriend={this.props.toggleAddingFriend}
                      whichFriendIsAdding={this.props.whichFriendIsAdding}
                      toggleWhichFriendIsAdding={this.props.toggleWhichFriendIsAdding}
            />)
    }

    showMoreUsersOnClick = () => {
        this.props.toggleIsFetching(true);
        getUsers(this.props.usersCount, this.props.currentPage + 1)
            .then((data) => {
                this.props.toggleIsFetching(false);
                this.props.setUsers([...this.props.users, ...data.items]);
                this.props.setCurrentPage(this.props.currentPage + 1);
            });
    }

    render() {
        let pagesCount = Math.ceil(this.props.totalCount / this.props.usersCount);
        return(
            <div className='find-friends'>
                <div className="find-friends__search-box">
                    <input type="text" className="find-friends__search-input" placeholder='Search...'/>
                    <i className="fas fa-search " />
                </div>
                <SearchFilters />
                <div className={this.props.isFetching ? "find-friends__user-list find-friends__user-list--is-fetching" : "find-friends__user-list"}>
                    {this.mapUserItems()}
                    <div className="find-friends__show-more-wrapper">
                        <div className="find-friends__show-more-box" onClick={this.showMoreUsersOnClick}>
                            <ShowMoreBtn />
                        </div>
                    </div>
                </div>
                <div className="find-friends__pagination-box" >
                    <Pagination
                        changeCurrentPage = {this.props.setCurrentPage}
                        currentPage={this.props.currentPage}
                        pagesCount={pagesCount}
                        setUsers={this.props.setUsers}
                        usersCount={this.props.usersCount}
                        toggleIsFetching={this.props.toggleIsFetching}
                    />
                </div>
            </div>
        )
    }
}

export default FindFriends;