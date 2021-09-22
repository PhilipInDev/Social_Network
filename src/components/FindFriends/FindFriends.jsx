import './FindFriends.scss'
import UserItem from "./UserItem/UserItem";
import SearchFilters from "./SearchFilters/SearchFilters";
import ShowMoreBtn from "./ShowMoreBtn/ShowMoreBtn";
import React from 'react';
import Pagination from "../SharedComponents/Pagination/Pagination";
import SearchInput from "./SearchInput/SearchInput";
import {nanoid} from "nanoid";

class FindFriends extends React.Component{
    mapUserItems = () => {
       return this.props.users.map((item) =>
            <UserItem key={nanoid()}
                      photos={item.photos}
                      name={item.name}
                      status={item.status}
                      isFriend={item.followed}
                      id={item.id}
                      whichFriendIsAdding={this.props.whichFriendIsAdding}
                      postAddFriend={this.props.postAddFriend}
                      deleteFriend={this.props.deleteFriend}
            />)
    }

    showMoreUsersOnClick = async () => {
        let yOffset = window.pageYOffset;
        await this.props.getAdditionalUsers(this.props.usersCount, +this.props.currentPage + 1, this.props.users, this.props.searchCondition);
        window.scrollTo( 0, yOffset );
    }
    render() {
        return(
            <div className='find-friends'>
                <div className="find-friends__search-box">
                    <SearchInput getUsers={this.props.getUsers} setSearchCondition={this.props.setSearchCondition}/>
                </div>
                <SearchFilters />
                <div className={this.props.isFetching ? "find-friends__user-list find-friends__user-list--is-fetching" : "find-friends__user-list"}>
                    {this.mapUserItems()}
                    <div className="find-friends__show-more-wrapper">
                        {
                            this.props.currentPage < Math.ceil(this.props.totalCount / this.props.usersCount)
                                ?
                                <div className="find-friends__show-more-box" onClick={this.showMoreUsersOnClick}>
                                    <ShowMoreBtn />
                                </div>
                                :
                                null
                        }
                    </div>
                </div>
                <div className="find-friends__pagination-box" >
                    <Pagination
                        changeCurrentPage = {this.props.setCurrentPage}
                        currentPage={+this.props.currentPage}
                        itemsCount={this.props.usersCount}
                        totalCount={this.props.totalCount}
                        getItems={this.props.getUsers}
                        numOfLinks={5}
                        searchCondition={this.props.searchCondition}
                    />
                </div>
            </div>
        )
    }
}

export default FindFriends;