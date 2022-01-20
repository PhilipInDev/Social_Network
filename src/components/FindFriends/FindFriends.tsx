import './FindFriends.scss'
import UserItem from "./UserItem/UserItem";
import SearchFilters from "./SearchFilters/SearchFilters";
import ShowMoreBtn from "./ShowMoreBtn/ShowMoreBtn";
import React, {FC} from 'react';
import Pagination from "../SharedComponents/Pagination/Pagination";
import SearchInput from "./SearchInput/SearchInput";
import {nanoid} from "nanoid";
import {FindFriendsPropsType} from "../../containers/FindFriendsContainer";
import {useHistory} from "react-router-dom";

const FindFriends: FC<FindFriendsPropsType> = (props) => {
    const {usersCount, currentPage, getUsers} = props;
    const history = useHistory();
    const {location} = history;

    const mapUserItems = () => {
        return props.users.map((item) =>
            <UserItem key={nanoid()}
                      photos={item.photos}
                      name={item.name}
                      status={item.status}
                      followed={item.followed}
                      id={item.id}
                      whichFriendIsAdding={props.whichFriendIsAdding}
                      postAddFriend={props.postAddFriend}
                      deleteFriend={props.deleteFriend}
            />)

    }
    const showMoreUsersOnClick = () => {
        let yOffset = window.scrollY;
        props.getAdditionalUsers(props.usersCount, +props.currentPage + 1, props.users, props.searchConditions.term, props.searchConditions.isOnlyFriends);
        window.scrollTo( 0, yOffset );
    }
    const setQueryParams = (paramType: 'term' | 'friends' | 'page', value: boolean | string | number | null) => {
        const REG_EX = paramType === 'term'
            ? /term=\w*/
            : 'page'
                ? /page=\d*/
                : /friends=(true|false|null)/;
        let locationSliced = '';
        if(location.search) {
            locationSliced = location.search.slice(1);
        }
        if(location.search.includes(paramType)) {
            const updParams = location.search.replace(REG_EX, `${paramType}=${value}`);
            history.push(updParams);
        }
        if(!location.search.includes(paramType)){
            history.push(`${location.pathname}?${locationSliced}&${paramType}=${value}`)
        }
    }
    return(
        <div className='find-friends'>
            <div className="find-friends__search-box">
                <SearchInput setQueryParams={setQueryParams} setSearchConditions={props.setSearchConditions}/>
            </div>
            <SearchFilters setQueryParams={setQueryParams} setSearchConditions={props.setSearchConditions}/>
            <div className={props.isFetching ? "find-friends__user-list find-friends__user-list--is-fetching" : "find-friends__user-list"}>
                {mapUserItems()}
                <div className="find-friends__show-more-wrapper">
                    {
                        props.currentPage < Math.ceil(props.totalCount / props.usersCount)
                            ?
                            <div className="find-friends__show-more-box" onClick={showMoreUsersOnClick}>
                                <ShowMoreBtn />
                            </div>
                            :
                            null
                    }
                </div>
            </div>
            <div className="find-friends__pagination-box" >
                <Pagination
                    currentPage={+currentPage}
                    itemsCount={usersCount}
                    totalCount={props.totalCount}
                    getItems={(itemsCount: number, page: number) => {
                        getUsers(itemsCount, page, props.searchConditions?.term, props.searchConditions?.isOnlyFriends);
                        setQueryParams('page', page);
                    }}
                    numOfLinks={5}
                />
            </div>
        </div>
    )
}

export default FindFriends;