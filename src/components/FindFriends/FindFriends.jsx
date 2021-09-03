import './FindFriends.scss'
import UserItem from "./UserItem/UserItem";
import SearchFilters from "./SearchFilters/SearchFilters";
import ShowMoreBtn from "./ShowMoreBtn/ShowMoreBtn";
import React from 'react';
import Pagination from "./Pagination/Pagination";

class FindFriends extends React.Component{
    mapUserItems = () => {
       return this.props.users.map(item =>
            <UserItem photos={item.photos}
                      name={item.name}
                // location={item.location}
                      status={item.status}
                      isFriend={item.followed}
                      id={item.id}
                      whichFriendIsAdding={this.props.whichFriendIsAdding}
                      postAddFriend={this.props.postAddFriend}
                      deleteFriend={this.props.deleteFriend}
            />)
    }

    showMoreUsersOnClick = () => {
        this.props.getAdditionalUsers(this.props.usersCount,this.props.currentPage + 1, this.props.users)
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
                        usersCount={this.props.usersCount}
                        getUsers={this.props.getUsers}
                    />
                </div>
            </div>
        )
    }
}

export default FindFriends;